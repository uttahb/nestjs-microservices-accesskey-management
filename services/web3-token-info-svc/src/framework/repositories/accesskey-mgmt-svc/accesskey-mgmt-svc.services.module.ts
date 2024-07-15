import { AccessKeyMgmtService } from './accesskey-mgmt-svc.services.service';
import { Module } from '@nestjs/common';
import { IAccessKeyServices } from '../../../domain';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCESSKEY_MGMT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://mongo:5672'],
          queue: 'accesskey_mgmt_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: IAccessKeyServices,
      useClass: AccessKeyMgmtService,
    },
  ],
  exports: [IAccessKeyServices],
})
export class AccessKeyMgmtServicesModule {}
