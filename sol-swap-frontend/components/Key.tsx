'use client'

import React, { useState } from 'react'
import axios from 'axios'
import bs58 from 'bs58'

const Key = () => {
  const [publicKey, setPublicKey] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (event: any) => {
    setPublicKey(event.target.value)
  }

  const isValidPublicKey = (key: string): boolean => {
    try {
      const decoded = bs58.decode(key)
      return decoded.length === 32
    } catch (e) {
      return false
    }
  }

  const postKey = async () => {
    if (!isValidPublicKey(publicKey)) {
      setError('Invalid public key')
      return
    }
    try {
      await axios.post(`/api/key?key=${publicKey}`)
      window.location.reload()
    } catch (error) {
      console.error('Error updating user wallet:', error)
    }
  }

  return (
    <div className="w-120 text-slate-500 mb-8 flex flex-row justify-between">
      <div className="flex flex-row items-center">
        <h2>Your public key : </h2>
        <input
          className="px-4 py-2 mx-4 w-120 border-slate-500 ring-slate-500 border rounded-lg"
          type="text"
          placeholder="Your public key here"
          value={publicKey}
          onChange={handleInputChange}
        />
        {error && <span className="text-red-500 ml-2">{error}</span>}
      </div>
      <div>
        <button className="bg-slate-100 p-2 rounded-xl" onClick={postKey}>
          Fetch
        </button>
      </div>
    </div>
  )
}

export default Key
