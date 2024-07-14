import {  Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {  Web3TokenInfoGenericRepository } from './web3token-info-generic-repository';
import {  IWeb3TokenInfoServices, TokenInfo } from 'src/domain';

@Injectable()
export class Web3TokenInfoService
  implements IWeb3TokenInfoServices, OnApplicationBootstrap
{
  tokenInfo: Web3TokenInfoGenericRepository<TokenInfo>;
  constructor() {}
  onApplicationBootstrap() {
    console.log('onApplicationBootstrap');
    this.tokenInfo = new Web3TokenInfoGenericRepository<TokenInfo>();
  }
}
