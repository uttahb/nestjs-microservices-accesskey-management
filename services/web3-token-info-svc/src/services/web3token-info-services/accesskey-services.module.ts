import { Module } from '@nestjs/common';
import { Web3TokenInfoServicesModule } from '../../framework/repositories/web3token-info-svc/web3token-info-svc.services.module';

@Module({
  imports: [Web3TokenInfoServicesModule],
  exports: [Web3TokenInfoServicesModule],
})
export class Web3TokenServicesModule {}
