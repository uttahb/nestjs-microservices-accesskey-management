import { TokenInfo } from "../entities";

export abstract class IWeb3TokenInfoGenericRepository<T> {
    abstract getTokenInfo(): Promise<TokenInfo[]>;
  }
 