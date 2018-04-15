import connect from '../db';
import { Data } from '../types/data';

const knex = connect();

export async function getDataById(id: number): Promise<Data> {
  const result = await knex
    .select(['id', 'boolean', 'integer', 'text', 'created_at AS createdAt', 'updated_at AS updatedAt'])
    .from('data')
    .where('id', id);

  if (result.length === 0) {
    return undefined;
  }

  return result[0];
}
