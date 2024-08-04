const Features = () => {
  const featues = [
    '⚡ Blazing-Fast Transactions: Leveraging the high-performance Solana blockchain, SolSwap ensures your transactions are completed in seconds.',

    '💸 Low Fees: Enjoy minimal transaction fees, making your swaps cost-effective and efficient.',

    '🔒 Secure and Trustless: Built on decentralized principles, SolSwap provides a secure environment for all your transactions, ensuring your assets remain in your control.',

    '🌐 Wide Token Support: Swap a diverse range of tokens seamlessly, with new tokens added regularly to meet your needs.',

    '🚀 User-Friendly Interface: An intuitive and sleek interface designed for both beginners and seasoned traders, making token swapping a breeze.',
  ]

  return (
    <div className="flex flex-col items-start gap-4 justify-between text-xl text-gray-600 mx-auto">
      {featues.map((feature, index) => (
        <div key={index}>{feature}</div>
      ))}
    </div>
  )
}

export default Features
