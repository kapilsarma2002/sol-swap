'use client'
import { PublicKey } from '@solana/web3.js'
import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import axios from 'axios'
import { useState, useEffect } from 'react'

// export const fetchPriceData = async (nft: any) => {
  
//   const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)

//   try {
//     const collectionName = encodeURIComponent(nft.collection) // Encode the collection name for URL safety
//     const floorPriceResponse = await fetch(
//       `https://api.nftscan.com/v1/solana/collection/${collectionName}/floor_price`
//     )
//     const floorPriceData = await floorPriceResponse.json()

//     let price
//     if (floorPriceData && floorPriceData.floor_price) {
//       price = floorPriceData.floor_price / 1e9 // Convert from lamports to SOL
//     } else {
//       // Fallback to recent sales data if floor price is not available
//       const salesResponse = await fetch(
//         `https://api.nftscan.com/v1/solana/collection/${collectionName}/sales`
//       )
//       const salesData = await salesResponse.json()

//       if (salesData && salesData.sales && salesData.sales.length > 0) {
//         const recentSalePrice = salesData.sales[0].price / 1e9 // Convert from lamports to SOL
//         price = recentSalePrice
//       } else {
//         // Fallback to a default price
//         price = 0.01 // Default value in SOL
//       }
//     }

//     console.log('price:', price)

//     // Optional refinements based on collection size and number of NFTs owned
//     const collectionSize = nft.items_total
//     const ownedCount = nft.owns_total

//     if (collectionSize > 1000000) {
//       price *= 0.5 // Reduce price if collection is very large
//     }

//     if (ownedCount > 10) {
//       price *= 1.2 // Increase price if user owns more NFTs
//     }

//     setEstimatedPrice(price)
//   } catch (error) {
//     console.error('Error fetching price data:', error)
//     setEstimatedPrice(0.01) // Default price in case of error
//   }
// }


export async function fetchNFTs(publicKey: string, connection: any) {
  try{
    const NFTs = await axios.get(
      `https://solanaapi.nftscan.com/api/sol/account/own/all/${publicKey}?show_attribute=false`,
      {
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    )
    // // const nftdata = Array.from(NFTs.data)
    // const pricePromises = (await Array.fromAsync(NFTs.data)).map((nft: any) =>
    //   fetchPriceData(nft)
    // )
    // const prices = await Promise.all(pricePromises)
    // Array.from(NFTs.data).map((nft: any, index: number) => {
    //   nft.estimatedPrice = prices[index]
    // })
    // console.log('NFTs:', NFTs.data)
    return NFTs.data
  } catch (error) {
    console.error('Error fetching NFTs:', error)
    throw error
  }
}
