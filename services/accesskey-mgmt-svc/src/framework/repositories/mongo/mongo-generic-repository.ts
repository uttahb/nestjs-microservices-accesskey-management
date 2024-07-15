import { Model } from 'mongoose';
import { IGenericRepository } from '../../../domain';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  get(id: any): Promise<T> {
    return this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .exec() as Promise<T>;
  }
  delete(id: string): Promise<boolean> {
    try {
      this._repository.findByIdAndDelete(id).exec();
      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  async update(id: string, item: T) {
    await this._repository.findByIdAndUpdate(id, item);
    return this.get(id);
  }
}
