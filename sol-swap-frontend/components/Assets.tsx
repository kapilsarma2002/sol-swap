'use client'

import React, { useState, useEffect } from 'react'
import { connection } from '@/utils/constants'
import { useTokens } from '@/app/api/tokens/hooks/useTokens'
import { Spinner } from '@nextui-org/react'
import { fetchNFTs } from '@/components/NFT'
import TokenList from './TokenLIst'
import SwapTokens from './SwapTokens'

export interface NFT {
  mint: string
  name: string
  symbol: string
  uri: string
  image: string
}

const Assets = ({ publicKey }: { publicKey: string }) => {
  const [copied, setCopied] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loadingNFTs, setLoadingNFTs] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedToken, setSelectedToken] = useState('SOL')
  const [activeTab, setActiveTab] = useState('tokens')
  const { tokenBalances, loading } = useTokens(publicKey)

  useEffect(() => {
    if (publicKey) {
      setLoadingNFTs(true)
      setError(null)
      fetchNFTs(publicKey, connection)
        .then(setNfts)
        .catch((err) => setError(err.message))
        .finally(() => setLoadingNFTs(false))
    }
  }, [publicKey])

  useEffect(() => {
    if (copied) {
      let interval = setTimeout(() => {
        setCopied(false)
      }, 3000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [copied])

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-center">
        <Spinner label="loading..." color="default" labelColor="foreground" />
      </div>
    )
  }

  if (loadingNFTs)
    return (
      <div className="flex flex-row items-center justify-center">
        <Spinner
          label="loading NFTs..."
          color="default"
          labelColor="foreground"
        />
      </div>
    )
  if (error) return <div>Error loading NFTs: {error}</div>

  const handleSelectedNFT = (nft: any) => {
    setSelectedNFT(nft)
    console.log('Selected NFT:', nft)
  }

  const handleSelectedToken = (token: any) => {
    setSelectedToken(token)
  }

  const liquidateNFT = (nft: any, token: any) => {
    // This is a placeholder. You'll need to implement the actual interaction with your smart contract here.
    console.log(`Liquidating NFT: ${nft} for token: ${token}`)
  }

  return (
    <div className="text-slate-500 mt-4">
      Account assets
      <br />
      <div className="flex justify-between">
        <span className="mt-2">
          <span className="text-black font-bold text-5xl">
            ${tokenBalances?.totalBalance}
            <span className="text-slate-500 text-3xl"> USD</span>
          </span>
        </span>
        <button
          className="bg-slate-100 p-2 rounded-xl"
          onClick={() => {
            navigator.clipboard.writeText(publicKey)
            setCopied(true)
          }}
        >
          {copied ? 'Copied!' : 'Your wallet address'}
        </button>
      </div>
      <div className="mt-4">
        <div className="flex space-x-4">
          <button
            className={`p-2 ${
              activeTab === 'tokens' ? 'bg-slate-100' : 'bg-white'
            } rounded-lg`}
            onClick={() => setActiveTab('tokens')}
          >
            Tokens
          </button>
          <button
            className={`p-2 ${
              activeTab === 'nfts' ? 'bg-slate-100' : 'bg-white'
            } rounded-lg`}
            onClick={() => setActiveTab('nfts')}
          >
            NFTs
          </button>
          <button
            className={`p-2 ${
              activeTab === 'swap' ? 'bg-slate-100' : 'bg-white'
            } rounded-lg`}
            onClick={() => setActiveTab('swap')}
          >
            Swap
          </button>
        </div>

        {activeTab === 'tokens' && (
          <div>
            <TokenList tokens={tokenBalances?.tokens ?? []} />
          </div>
        )}

        {activeTab === 'nfts' && (
          <div className="p-3">
            {nfts.length === 0 ? (
              <p>No NFTs found for this wallet.</p>
            ) : (
              nfts.map((nft) => (
                <div key={nft.mint} className="flex justify-between">
                  <div className="flex flex-col justify-start">
                    <p>
                      <span className="font-bold">Name:</span> {nft.name}
                    </p>
                    <p>
                      <span className="font-bold">Symbol:</span> {nft.symbol}
                    </p>
                    <img
                      className="m-2"
                      src={nft.image}
                      alt={nft.name}
                      height={150}
                      width={150}
                    />
                    <p>
                      <span className="font-bold">Mint:</span> {nft.mint}
                    </p>
                  </div>
                  <button className="bg-slate-100 p-2 h-10 rounded-lg">
                    Liquidate
                  </button>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === 'swap' && (
          <div>
            <SwapTokens tokenBalances={tokenBalances} />
          </div>
        )}
      </div>
      {/* {selectedNFT && selectedToken && (
        <button
          className="bg-red-500 text-white p-2 rounded-2xl mt-4"
          onClick={() => liquidateNFT(selectedNFT, selectedToken)}
        >
          Liquidate NFT
        </button>
      )} */}
    </div>
  )
}

const TokenSelector = ({ onSelect }: { onSelect: any }) => {
  const tokens = ['SOL', 'USDC', 'USDT']
  return (
    <select
      className="p-2 rounded-md bg-slate-100"
      onChange={(e) => onSelect(e.target.value)}
    >
      {tokens.map((token) => (
        <option key={token} value={token}>
          {token}
        </option>
      ))}
    </select>
  )
}

export default Assets
