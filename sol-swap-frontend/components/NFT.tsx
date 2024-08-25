import Image from "next/image"
import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz'

export const NFTSelector = ({
  nfts,
  onSelect,
}: {
  nfts: any[]
  onSelect: any
}) => {

  return (
    <div>
      {nfts.map((nft: any) => (
        <div key={nft.mint} onClick={() => onSelect(nft)}>
          <Image src={nft.data.uri} alt={nft.data.name} />
          <p>{nft.data.name}</p>
        </div>
      ))}
    </div>
  )
}

export const getUserNFTs = async (publicKey: string, connection: any) => {
  const nfts = await getParsedNftAccountsByOwner({
    publicAddress: publicKey,
    connection: connection,
  })
  return nfts
}