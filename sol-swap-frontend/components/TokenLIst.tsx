import Image from 'next/image'
import { TokenWithBalance } from '../app/api/tokens/hooks/useTokens'

const TokenList = ({ tokens }: { tokens: TokenWithBalance[] }) => {
  return (
    <div>
      {tokens.map(token => <TokenRow token={token} key={token.name} />)}
    </div>
  )
}

const TokenRow = ({ token }: { token: TokenWithBalance }) => {
  return (
    <div className="flex justify-between pt-4">
      <div className="flex">
        <div className="m-4">
          <Image
            className="rounded-full"
            src={token.image}
            alt={token.name}
            width={40}
            height={40}
          />
        </div>
        <div className="pt-3">
          <div className="font-bold">{token.name}</div>
          <div className="font-slim">
            1 {token.name} = ~{token.price}
          </div>
        </div>
      </div>
      <div>
        <div className="pt-3">
          <div className="font-bold flex justify-end">{token.USDBalance}</div>
          <div className="font-slim flex justify-end">
            {token.balance} {token.name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenList;