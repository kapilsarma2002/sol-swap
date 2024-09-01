'use client'
import { useEffect, useState } from 'react'
import { SUPPORTED_TOKENS, TokenDetails } from '@/utils/tokens'

const SwapTokens = ({tokenBalances}: {tokenBalances: any}) => {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0])
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1])
  const [baseAmount, setBaseAmount] = useState<string>('')
  const [quoteAmount, setQuoteAmount] = useState<string>('')

  useEffect(() => {
    if (!baseAmount) {
      return;
    }
  }, [baseAsset, quoteAsset, baseAmount])

  return (
    <div>
      <SwapInputRow
        onSelect={(asset: TokenDetails) => {
          setBaseAsset(asset)
        }}
        selectedToken={baseAsset}
        amount={baseAmount}
        onAmountChange = {(value: string) => {
          setBaseAmount(value)
        }}
        title={'You pay'}
        subtitle={'Current balance: ' + tokenBalances.tokens.find((x: any) => x.name === baseAsset.name).balance + ' ' + baseAsset.name}
      />
      <SwapInputRow
        onSelect={(asset: TokenDetails) => {
          setQuoteAsset(asset)
        }}
        selectedToken={quoteAsset}
        amount={quoteAmount}
        title={'You receive'}
        subtitle={'Current balance: ' + tokenBalances.tokens.find((x: any) => x.name === quoteAsset.name).balance + ' ' + quoteAsset.name}
      />
    </div>
  )
}

const SwapInputRow = ({
  onSelect,
  selectedToken,
  title,
  subtitle,
  amount,
  onAmountChange,
}: {
  onSelect: (asset: TokenDetails) => void
  selectedToken: TokenDetails
  title: string
  subtitle: string
  amount?: string
  onAmountChange?: (value: string) => void
}) => {
  return (
    <div className="border flex justify-between p-8">
      <div>
        <div className="text-md font-semibold mb-1">{title}</div>
        <AssetSelector onSelect={onSelect} selectedToken={selectedToken} />
        <div className="text-slate-500 pt-1 text-sm pl-1">{subtitle}</div>
      </div>
      <div>
        <input
          type="text"
          className="p-6 outline-none text-4xl text-black"
          placeholder="0"
          dir="rtl"
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
        />
      </div>
    </div>
  )
}

const AssetSelector = ({ selectedToken, onSelect }: { selectedToken: TokenDetails, onSelect: (asset: TokenDetails) => void }) => {
  return (
    <div>
      <select
        onChange={(e) => {
          const selectedToken = SUPPORTED_TOKENS.find(
            (x) => x.name === e.target.value
          )
          if (selectedToken) onSelect(selectedToken)
        }}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
      >
        <option defaultValue={selectedToken.name}>
          {' '}
          <img
            src={selectedToken.image}
            alt={selectedToken.name}
            height={40}
            width={40}
          />{' '}
          {selectedToken.name}
        </option>
        {SUPPORTED_TOKENS.filter((x) => x.name !== selectedToken.name).map(
          (token) => (
            <option key={token.name} value={token.name}>
              <div>
                <img
                  src={selectedToken.image}
                  alt={selectedToken.name}
                  height={40}
                  width={40}
                />
                <div>{token.name}</div>
              </div>

            </option>
          )
        )}
      </select>
    </div>
  )
}

export default SwapTokens
