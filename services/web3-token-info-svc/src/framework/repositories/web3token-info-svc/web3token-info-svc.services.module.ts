import { Web3TokenInfoService } from './web3token-info-svc.services.service';
import { Module } from '@nestjs/common';
import { IWeb3TokenInfoServices } from '../../../domain';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCESSKEY_MGMT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
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
      provide: IWeb3TokenInfoServices,
      useClass: Web3TokenInfoService,
    },
  ],
  exports: [IWeb3TokenInfoServices],
})
export class Web3TokenInfoServicesModule {}
