import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Get('/web3-token-info')
  async getWeb3TokenInfo(@Headers('X-API-KEY') key: string) {
    return this.appService.getWeb3TokenInfo(key);
  }
}
