import { PublicKey } from '@solana/web3.js'
import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

// export const NFTSelector = ({
//   nfts,
//   onSelect,
// }: {
//   nfts: any[]
//   onSelect: any
// }) => {

//   return (
//     <div>
//       {nfts.map((nft: any) => (
//         <div key={nft.mint} onClick={() => onSelect(nft)}>
//           <Image src={nft.data.uri} alt={nft.data.name} />
//           <p>{nft.data.name}</p>
//         </div>
//       ))}
//     </div>
//   )
// }


export async function fetchNFTs(publicKey: string, connection: any) {

  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(publicKey),
      { programId: TOKEN_PROGRAM_ID }
    )

    const nftAccounts = tokenAccounts.value.filter((account: any) => {
      const amount = account.account.data.parsed.info.tokenAmount.amount
      const decimals = account.account.data.parsed.info.tokenAmount.decimals
      return amount === '1' && decimals === 0
    })

    const nftsWithMetadata = await Promise.all(
      nftAccounts.map(async (nftAccount: any) => {
        const tokenMint = new PublicKey(
          nftAccount.account.data.parsed.info.mint
        )

        const [metadataPDA] = PublicKey.findProgramAddressSync(
          [
            Buffer.from('metadata'),
            new PublicKey(
              'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
            ).toBuffer(),
            tokenMint.toBuffer(),
          ],
          new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
        )

        try {
          const metadataAccount = await connection.getAccountInfo(metadataPDA)
          if (metadataAccount) {
            const [metadata] = Metadata.deserialize(metadataAccount.data)
            return {
              mint: tokenMint.toString(),
              name: metadata.data.name,
              symbol: metadata.data.symbol,
              uri: metadata.data.uri,
            }
          }
        } catch (error) {
          console.error(
            `Error fetching metadata for ${tokenMint.toString()}:`,
            error
          )
        }

        return null
      })
    )

    return nftsWithMetadata.filter(
      (nft): nft is NonNullable<typeof nft> => nft !== null
    )
  } catch (error) {
    console.error('Error fetching NFTs:', error)
    throw error
  }
}

// export const getUserNFTs = async (publicKey: string, connection: any) => {
//   const nfts = await getParsedNftAccountsByOwner({
//     publicAddress: publicKey,
//     connection: connection,
//   })
//   return nfts
// }
