import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccessKeyMgmtGenericRepository } from './accesskey-mgmt-generic-repository';
import { AccessKeyInfo, IAccessKeyServices } from 'src/domain';

@Injectable()
export class AccessKeyMgmtService
  implements IAccessKeyServices, OnApplicationBootstrap
{
  accessKeyInfo: AccessKeyMgmtGenericRepository<AccessKeyInfo>;
  constructor(
    @Inject('ACCESSKEY_MGMT_SERVICE')
    private accessKeyInfoRepository: ClientProxy,
  ) {}
  onApplicationBootstrap() {
    this.accessKeyInfo = new AccessKeyMgmtGenericRepository<AccessKeyInfo>(
      this.accessKeyInfoRepository,
    );
  }
}
