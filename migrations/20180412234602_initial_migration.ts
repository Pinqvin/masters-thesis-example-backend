import * as Knex from 'knex';

exports.up = function (knex: Knex): PromiseLike<any> {
  return knex.schema.createTable('data', (table) => {
    table.increments('id');
    table.boolean('boolean');
    table.integer('integer');
    table.text('text');
    table.timestamps(true, true);
  });
};

exports.down = function (knex: Knex): PromiseLike<any> {
  return knex.schema.dropTableIfExists('data');
};
