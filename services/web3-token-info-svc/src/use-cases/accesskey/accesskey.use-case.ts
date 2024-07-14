import { Injectable } from '@nestjs/common';
import { AccessKeyInfo } from '../../domain/entities';
import { IAccessKeyServices } from '../../domain/abstracts';

@Injectable()
export class AccessKeyUseCases {
  constructor(private accessKeyServices: IAccessKeyServices) {}

  getAccessKeybyId(key: string): Promise<AccessKeyInfo> {
    return this.accessKeyServices.accessKeyInfo.getAccessKeyData(key);
  }
}
