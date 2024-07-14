import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../services/data-services/data-services.module';
import { AccessKeyFactoryService } from './accesskey-factory.service';
import { AccessKeyUseCases } from './accesskey.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [AccessKeyFactoryService, AccessKeyUseCases],
  exports: [AccessKeyFactoryService, AccessKeyUseCases],
})
export class AccessKeyUseCasesModule {}
