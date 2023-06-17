import { CollectionName, dbPool } from '@config';
import { v4 as uuidV4 } from 'uuid';
import { insertQueryFromObject, updateQueryFromObject } from '@helpers';

class BaseRepository {
  private readonly collectionName: CollectionName;

  constructor(collectionName: CollectionName) {
    this.collectionName = collectionName;
  }

  generateId() {
    return uuidV4();
  }

  async getAll<T extends object>() {
    const result = await dbPool.query(`SELECT * FROM ${this.collectionName};`);

    return result.rows as T;
  }

  async getById<T extends object>(id: string) {
    const result = await dbPool.query(`SELECT * FROM ${this.collectionName} WHERE id = ${id};`);

    return result.rows as T;
  }

  async create(data: Record<string, unknown>) {
    data.id = this.generateId();

    const insertQuery = insertQueryFromObject(data);

    await dbPool.query(`INSERT INTO ${this.collectionName} ${insertQuery};`);

    return data;
  }

  async update<T extends object>(data: Record<string, unknown>, id: string) {
    const updateQuery = updateQueryFromObject(data);

    await dbPool.query(`UPDATE ${this.collectionName} SET ${updateQuery} WHERE id = '${id}';`);

    return await this.getById<T>(id);
  }

  async delete(id: string) {
    await dbPool.query(`DELETE FROM game_records WHERE id = '${id}'`);
  }
}

export default BaseRepository;
