import { AccessKeyInfo } from '../entities';
import { IGenericAccessKeyRepository } from './generic-repository.abstract';

export abstract class IAccessKeyServices {
  abstract accessKeyInfo: IGenericAccessKeyRepository<AccessKeyInfo>;
}
