import { IWeb3TokenInfoGenericRepository, TokenInfo } from 'src/domain';

export class Web3TokenInfoGenericRepository<T>
  implements IWeb3TokenInfoGenericRepository<T>
{
  /**
   * @todo Implement the right 3rd party service call to fetch token data here.
   * @returns TokenInfo[]
   */
  getTokenInfo(): Promise<TokenInfo[]> {
    return Promise.resolve([
      {
        id: 'chameleon-travel-club',
        name: 'ChameleonTravelClub',
        symbol: 'CTC',
        thumb:
          'https://assets.coingecko.com/nft_contracts/images/3610/standard/chameleon-travel-club.png?1707290106',
        nft_contract_id: 3610,
        native_currency_symbol: 'eth',
        floor_price_in_native_currency: 4.29,
        floor_price_24h_percentage_change: 57.3120347225931,
        data: {
          floor_price: '4.29 ETH',
          floor_price_in_usd_24h_percentage_change: '57.3120347225931',
          h24_volume: '11.26 ETH',
          h24_average_sale_price: '2.82 ETH',
          sparkline: 'https://www.coingecko.com/nft/3610/sparkline.svg',
          content: null,
        },
      },
      {
        id: 'natcats',
        name: 'Natcats',
        symbol: 'DMTNATCATS',
        thumb:
          'https://assets.coingecko.com/nft_contracts/images/4171/standard/natcats.png?1709517703',
        nft_contract_id: 4171,
        native_currency_symbol: 'btc',
        floor_price_in_native_currency: 0.05139,
        floor_price_24h_percentage_change: 52.5917829733019,
        data: {
          floor_price: '0.051 BTC',
          floor_price_in_usd_24h_percentage_change: '52.5917829733019',
          h24_volume: '3.93 BTC',
          h24_average_sale_price: '0.049 BTC',
          sparkline: 'https://www.coingecko.com/nft/4171/sparkline.svg',
          content: null,
        },
      },
    ]);
  }
}
