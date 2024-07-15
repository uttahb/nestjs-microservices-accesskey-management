import { Module } from '@nestjs/common';
import { AppController } from './framework/controllers/app.controller';
import { AppService } from './services/app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomThrottlerGuard } from './framework/controllers/guards/throttler.guard';
import { APP_GUARD } from '@nestjs/core';
import { AccessKeyServicesModule } from './services/accesskey-services/accesskey-services.module';
import { AccessKeyUseCasesModule } from './use-cases/accesskey/accesskey-use-cases.module';
import { AccessKeyUseCases } from './use-cases/accesskey/accesskey.use-case';
import { Web3TokenServicesModule } from './services/web3token-info-services/accesskey-services.module';
import { Web3TokenUseCasesModule } from './use-cases/web3token/web3token-use-cases.module';
import { Web3TokenUseCases } from './use-cases/web3token/web3token.use-case';
@Module({
  imports: [
    AccessKeyUseCasesModule,
    AccessKeyServicesModule,
    Web3TokenServicesModule,
    Web3TokenUseCasesModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1,
      },
    ]),
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
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    AccessKeyUseCases,
    Web3TokenUseCases,
  ],
})
export class AppModule {}
