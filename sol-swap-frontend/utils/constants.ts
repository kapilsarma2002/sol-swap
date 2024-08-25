import { Connection } from '@solana/web3.js'
import axios from 'axios'

let LAST_UPDATED: number | null = null
let prices: {
  [key: string]: {
    price: string
  }
} = {}

const TOKEN_PRICE_REFRESH_INTERVAL = 1000 * 60

export const SUPPORTED_TOKENS: {
  name: string
  mint: string
  native: boolean
  image: string
}[] = [
  {
    name: 'USDC',
    mint: 'FSxJ85FXVsXSr51SeWf9ciJWTcRnqKFSmBgRDeL3KyWw',
    native: false,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEcnerucVph-1avO_ULln46nxtomsC6ReNBw&s',
  },
  {
    name: 'USDT',
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    native: false,
    image:
      'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png',
  },
  {
    name: 'SOL',
    mint: 'So11111111111111111111111111111111111111112',
    native: true,
    image:
      'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png',
  },
]

export const connection = new Connection(
  'https://solana-mainnet.g.alchemy.com/v2/j7GvCfS0-zIGv4K1KndGYCYn0EC6GSzM'
)

export const getSupportedTokens = async () => {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL
  ) {
    try {
      const response = await axios.get(
        'https://price.jup.ag/v6/price?ids=SOL,USDC,USDT'
      )
      prices = response.data.data
      LAST_UPDATED = new Date().getTime()
    } catch (e) {
      console.error('Failed to fetch token prices', e)
    }
  }
  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: prices[s.name].price,
  }))
}

getSupportedTokens();
