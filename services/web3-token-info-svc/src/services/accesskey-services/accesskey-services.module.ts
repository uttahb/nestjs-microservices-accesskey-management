import { Module } from '@nestjs/common';
import { AccessKeyMgmtServicesModule } from '../../framework/repositories/accesskey-mgmt-svc/accesskey-mgmt-svc.services.module';

@Module({
  imports: [AccessKeyMgmtServicesModule],
  exports: [AccessKeyMgmtServicesModule],
})
export class AccessKeyServicesModule {}
