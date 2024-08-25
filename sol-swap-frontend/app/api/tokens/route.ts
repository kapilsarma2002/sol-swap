import { NextRequest, NextResponse } from 'next/server'
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
} from '@solana/spl-token'
import { connection, getSupportedTokens } from '@/utils/constants'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { TokenAccountNotFoundError } from '@solana/spl-token'

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address') as unknown as string
  const supportedTokens = await getSupportedTokens()
  const balances = await Promise.all(
    supportedTokens.map((token) => getAccountBalance(token, address))
  )

  const tokens = supportedTokens.map((token, index) => ({
      ...token,
      balance: balances[index],
      USDBalance: balances[index] * Number(token.price),
    }))

  return NextResponse.json({
    tokens,
    totalBalance: tokens.reduce((acc, token) => acc + token.USDBalance, 0),
  })
}

const getAccountBalance = async (
  token: {
    name: string
    mint: string
    native: boolean
  },
  address: string
) => {
  if (token.native) {
    const balance = await connection.getBalance(new PublicKey(address))
    return balance / LAMPORTS_PER_SOL
  }

  const ata = await getAssociatedTokenAddress(
    new PublicKey(token.mint),
    new PublicKey(address)
  )

  try {
    const account = await getAccount(connection, ata)
    const mint = await getMint(connection, new PublicKey(token.mint))
    return Number(account.amount) / Math.pow(10, mint.decimals)
  } catch (error) {
    return 0
  }
}
