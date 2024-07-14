import { Controller, UseGuards } from '@nestjs/common';
import { AppService } from '../../services/app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CustomThrottlerGuard } from './guards/throttler.guard';
import { Web3TokenUseCases } from 'src/use-cases/web3token/web3token.use-case';

@Controller()
@UseGuards(CustomThrottlerGuard)
export class AppController {
  constructor(private readonly web3TokenUsecases: Web3TokenUseCases) {}

  @MessagePattern({ cmd: 'fetch-web3-token-info' })
  get() {
    return this.web3TokenUsecases.getTokenInfo();
  }
}
