import { AccessKeyInfo } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract accessKeyInfo: IGenericRepository<AccessKeyInfo>;
}
