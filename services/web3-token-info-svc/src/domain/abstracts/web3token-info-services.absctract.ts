import {  TokenInfo } from '../entities';
import { IWeb3TokenInfoGenericRepository } from './web3token-info-generic-repository.abstract';

export abstract class IWeb3TokenInfoServices {
  abstract tokenInfo: IWeb3TokenInfoGenericRepository<TokenInfo>;
}
