export class NftData {
    floor_price: string;

    floor_price_in_usd_24h_percentage_change: string;

    h24_volume: string;

    h24_average_sale_price: string;

    sparkline: string;

    content: string;

  }
export class TokenInfo {
    id: string;
  
    name: string;
  
    symbol: string;
  
    thumb: string;
  
    nft_contract_id: number;
  
    floor_price_in_native_currency: number;
  
    floor_price_24h_percentage_change: number;
  
    data: NftData;
  }
  
  