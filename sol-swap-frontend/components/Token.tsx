const TokenSelector = (onSelect : any) => {
  const tokens = ['SOL', 'USDC', 'USDT']
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      {tokens.map((token) => (
        <option key={token} value={token}>
          {token}
        </option>
      ))}
    </select>
  )
}

export default TokenSelector
