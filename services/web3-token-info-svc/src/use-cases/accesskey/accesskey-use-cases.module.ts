import { Module } from '@nestjs/common';
import { AccessKeyServicesModule } from '../../services/accesskey-services/accesskey-services.module';
import { AccessKeyUseCases } from './accesskey.use-case';

@Module({
  imports: [AccessKeyServicesModule],
  providers: [AccessKeyUseCases],
  exports: [AccessKeyUseCases],
})
export class AccessKeyUseCasesModule {}
