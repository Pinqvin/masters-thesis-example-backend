import Knex from 'knex';
import { DATABASE_URL } from './config';

let connection: undefined | Knex;

export const configuration = {
  client: 'pg',
  connection: DATABASE_URL,
  pool: {
    min: 1,
    max: 10
  }
};

function connect(): Knex {
  if (connection === undefined) {
    connection = Knex(configuration);

    return connection;
  }

  return connection;
}

export default connect;
