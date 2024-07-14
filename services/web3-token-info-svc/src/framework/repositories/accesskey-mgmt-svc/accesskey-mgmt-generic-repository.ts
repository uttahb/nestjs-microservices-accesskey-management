import { IGenericAccessKeyRepository } from 'src/domain';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, firstValueFrom } from 'rxjs';

export class AccessKeyMgmtGenericRepository<T>
  implements IGenericAccessKeyRepository<T>
{
  private _repository: ClientProxy;
  constructor(private repository: ClientProxy) {
    this._repository = repository;
  }
  getAccessKeyData(key: string): Promise<T> {
    return firstValueFrom(
      this._repository
        .send({ cmd: 'get-access-key-info-by-id' }, key)
        .pipe(timeout(5000)),
    );
  }
}
