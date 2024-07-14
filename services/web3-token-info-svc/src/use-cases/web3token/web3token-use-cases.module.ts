import { Module } from '@nestjs/common';
import { Web3TokenUseCases } from './web3token.use-case';
import { Web3TokenInfoServicesModule } from 'src/framework/repositories/web3token-info-svc/web3token-info-svc.services.module';

@Module({
  imports: [Web3TokenInfoServicesModule],
  providers: [Web3TokenUseCases],
  exports: [Web3TokenUseCases],
})
export class Web3TokenUseCasesModule {}
