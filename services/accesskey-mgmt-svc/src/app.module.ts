import { Module } from '@nestjs/common';
import { AccessKeyController } from './framework/controllers/accesskey.controller';
import { DataServicesModule } from './services/data-services/data-services.module';
import { AccessKeyUseCasesModule } from './use-cases/accesskey/accesskey-use-cases.module';

@Module({
  imports: [DataServicesModule, AccessKeyUseCasesModule],
  controllers: [AccessKeyController],
  providers: [],
})
export class AppModule {}
