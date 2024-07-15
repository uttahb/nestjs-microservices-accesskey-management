import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerMiddleware } from './logger';
import { UserController } from './user.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

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
      {
        name: 'WEB3_TOKEN_INFO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://mongo:5672'],
          queue: 'web3token_info_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
