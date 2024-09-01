export interface TokenDetails {
  name: string
  mint: string
  native: boolean
  image: string
  price: string
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
  {
    name: 'SOL',
    mint: 'So11111111111111111111111111111111111111112',
    native: true,
    price: '1',
    image:
      'https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png',
  },
  {
    name: 'USDC',
    mint: 'FSxJ85FXVsXSr51SeWf9ciJWTcRnqKFSmBgRDeL3KyWw',
    native: false,
    price: '1',
    image: 'https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png',
  },
  {
    name: 'USDT',
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    native: false,
    price: '1',
    image:
      'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png',
  },
]
