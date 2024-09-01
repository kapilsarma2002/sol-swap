import { TokenDetails } from "@/utils/tokens";
import axios from "axios";
import { useEffect, useState } from "react";

export interface TokenWithBalance extends TokenDetails {
  balance: string;
  USDBalance: string;
}

// 9EN132cbfUDRKw5DmAU1fkweuXCVr3UPkr6sTuBYqvLC
// 8fCXUDCkvhEQkYNyMbsWgYsaqikorojdv2hgfezfvbdD
export const useTokens = (address: string) => {
  const [tokenBalances, setTokenBalances] = useState<{
    totalBalance: number
    tokens: TokenWithBalance[]
  } | null>(null)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`/api/tokens?address=${address}`)
    .then(res => {
      setTokenBalances(res.data)
      setLoading(false)
    })
  }, [address])

  return {
    loading,
    tokenBalances
  }

}