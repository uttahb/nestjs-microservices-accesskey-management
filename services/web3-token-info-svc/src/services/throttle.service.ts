import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class ThrottleService {
  constructor(
    @Inject('ACCESSKEY_MGMT_SERVICE') private accessKeyMgmtClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  getAccessKeyData(key: string) {
    console.log('hell its here...', key);
    return this.accessKeyMgmtClient
      .send({ cmd: 'get-access-key-info-by-id' }, key)
      .pipe(timeout(5000));
  }
}
