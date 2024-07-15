import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from './types';
import { timeout } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('ACCESSKEY_MGMT_SERVICE') private accessKeyMgmtClient: ClientProxy,
    @Inject('WEB3_TOKEN_INFO_SERVICE') private web3tokenInfoClient: ClientProxy,
  ) {}
  generateAccessKey(accessKeyData: CreateAccessKeyDto) {
    return this.accessKeyMgmtClient
      .send({ cmd: 'create-access-key' }, accessKeyData)
      .pipe(timeout(5000));
  }
  updateAccessKey(accessKeyData: UpdateAccessKeyDto) {
    return this.accessKeyMgmtClient
      .send({ cmd: 'update-access-key' }, accessKeyData)
      .pipe(timeout(5000));
  }

  deleteAccessKey(id: string) {
    return this.accessKeyMgmtClient
      .send({ cmd: 'delete-access-key' }, id)
      .pipe(timeout(5000));
  }
  getAccessKeys() {
    return this.accessKeyMgmtClient
      .send({ cmd: 'get-all-access-keys' }, {})
      .pipe(timeout(5000));
  }
  getWeb3TokenInfo(key: string) {
    return this.web3tokenInfoClient
      .send({ cmd: 'fetch-web3-token-info' }, { accessKey: key })
      .pipe(timeout(5000));
  }
}
