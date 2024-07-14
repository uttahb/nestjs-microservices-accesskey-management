import { Injectable } from '@nestjs/common';
import { TokenInfo } from '../../domain/entities';
import { IWeb3TokenInfoServices } from '../../domain/abstracts';

@Injectable()
export class Web3TokenUseCases {
  constructor(private web3TokenServices: IWeb3TokenInfoServices) {}

  getTokenInfo(): Promise<TokenInfo[]> {
    return this.web3TokenServices.tokenInfo.getTokenInfo();
  }
}
