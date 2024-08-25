'use client'

import React, { useState, useEffect } from 'react'
import { NFTSelector, getUserNFTs } from '@/components/NFT'
import { Connection } from '@solana/web3.js'
import { MetadataKey } from '@nfteyez/sol-rayz/dist/config/metaplex'

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

const Assets = ({ publicKey }: {publicKey: string}) => {
  const [copied, setCopied] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [nfts, setNfts] = useState<NFT[]>([])
  const [selectedToken, setSelectedToken] = useState(null)

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
        <div>
          <h2 className="text-lg">NFTs</h2>
          <NFTSelector nfts={nfts} onSelect={handleSelectedNFT} />
        </div>
        <button
          className="bg-slate-100 p-2 rounded-2xl"
          onClick={() => {
            navigator.clipboard.writeText(publicKey)
            setCopied(true)
          }}
        >
          {copied ? 'Copied!' : 'Your wallet address'}
        </button>
      </div>
      {selectedNFT && (
        <div className="mt-4">
          <h3 className='text-black'>Selected NFT:</h3>
          <p>{selectedNFT}</p>
          {/* Add more details about the selected NFT as needed */}
        </div>
      )}
      <div>
        <h2 className="text-lg text-black">Select Token</h2>
        <TokenSelector onSelect={handleSelectedToken} />
      </div>
      {selectedNFT && selectedToken && (
        <button
          className="bg-red-500 text-white p-2 rounded-2xl mt-4"
          onClick={() => liquidateNFT(selectedNFT, selectedToken)}
        >
          Liquidate NFT
        </button>
      )}
    </div>
  )
}

const TokenSelector = ({ onSelect }: {onSelect: any}) => {
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
