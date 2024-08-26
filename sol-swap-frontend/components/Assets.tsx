'use client'

import React, { useState, useEffect } from 'react'
import { NFTSelector, getUserNFTs } from '@/components/NFT'
import { Connection } from '@solana/web3.js'
import { MetadataKey } from '@nfteyez/sol-rayz/dist/config/metaplex'
import { useTokens } from '@/app/api/tokens/hooks/useTokens'
import { Spinner } from '@nextui-org/react'
import TokenList from './TokenLIst'

type NFT = {
  mint: string
  updateAuthority: string
  data: {
    creators: any[]
    name: string
    symbol: string
    uri: string
    sellerFeeBasisPoints: number
  }
  key: MetadataKey
  primarySaleHappened: boolean
  isMutable: boolean
  editionNonce: number
  masterEdition?: string
  edition?: string
}

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

const Assets = ({ publicKey }: { publicKey: string }) => {
  const [copied, setCopied] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [nfts, setNfts] = useState<NFT[]>([])
  const [selectedToken, setSelectedToken] = useState(null)
  const [activeTab, setActiveTab] = useState('tokens')
  const { tokenBalances, loading } = useTokens(publicKey)

  useEffect(() => {
    const getNFTs = async () => {
      const fetchedNFTs = await getUserNFTs(publicKey, connection)
      setNfts(fetchedNFTs)
    }

    getNFTs()
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
        <span className='mt-2'>
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
        </div>

        {activeTab === 'tokens' && (
          <div>
            <TokenList tokens={tokenBalances?.tokens ?? []} />
          </div>
        )}

        {activeTab === 'nfts' && (
          <div>
            <h2 className="text-lg text-black">NFTs</h2>
            <NFTSelector nfts={nfts} onSelect={handleSelectedNFT} />
            {selectedNFT && (
              <div className="mt-4">
                <h3 className="text-black">Selected NFT:</h3>
                <p>{selectedNFT}</p>
                {/* Render selected NFT details here */}
              </div>
            )}
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
