import * as Knex from 'knex';
import faker from 'faker';
import { Client } from 'pg';
import { from as copyFrom } from 'pg-copy-streams';
import stringifyCb from 'csv-stringify';
import { promisify } from 'util';
import { DATABASE_URL } from '../src/config';

const stringifyAsync: (data: any, opts: stringifyCb.StringifyOpts) => Promise<string> = promisify(stringifyCb);

async function writeToStream(stream: NodeJS.WritableStream, data: string): Promise<any> {
  return new Promise(resolve => {
    if (!stream.write(data)) {
      return stream.once('drain', resolve);
    }

    return resolve();
  });
}

async function endStream(stream: NodeJS.WritableStream): Promise<any> {
  return new Promise(resolve => {
    stream.end(undefined, resolve);
  });
}

exports.seed = async function (knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex('data').del();

  const db = new Client({
    connectionString: DATABASE_URL
  });
  await db.connect();
  const writeStream = db.query(copyFrom(`COPY data (id, boolean, integer, text) FROM STDIN DELIMITER ';' CSV QUOTE '"'`)) as any;
  writeStream.on('error', (e: Error) => {
    console.log(e);
    throw e;
  });

  let buffer = [];

  for (let i = 0; i < 1000000; ++i) {
    buffer.push([i + 1, faker.random.boolean().toString(), faker.random.number(), faker.lorem.text()]);

    if (buffer.length >= 100000) {
      console.log(`Writing ${buffer.length} items to stream`);
      const dataString = await stringifyAsync(buffer, {
        delimiter: ';',
        eof: true,
      });
      await writeToStream(writeStream, dataString);
      buffer = [];
    }
  }

  await endStream(writeStream);
  await db.query('ALTER SEQUENCE data_id_seq RESTART WITH 1000000');
  await db.end();
};
