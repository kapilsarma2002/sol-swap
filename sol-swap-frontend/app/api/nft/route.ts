import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export default async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  const mint = searchParams.get('mint') as unknown as string

  try {
    const response = await axios.get(`https://api.solscan.io/nft/${mint}`)

    // console.log('res is : ', response)

    const data = response.data

    // Extract the price from the response
    const price = data.price // Adjust this based on the actual API response structure

    if (!price) {
      return NextResponse.json({ error: 'Price not found' })
    }

    NextResponse.json({ price })
  } catch (error) {
    // console.error('Error fetching NFT price:', error)
    NextResponse.json({ error: 'Error fetching NFT price' })
  }
}
