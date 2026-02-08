'use client'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export function MarkNeedRedirect() {
  const params = useParams()
  const claimId = params.claimId
  const verifyCode = params.verifyCode

  useEffect(() => {
    if (claimId) {
      localStorage.setItem(`claimId`, `${claimId}`)
    }
  }, [claimId])

  useEffect(() => {
    if (verifyCode) {
      localStorage.setItem(`verifyCode`, `${verifyCode}`)
    }
  }, [verifyCode])

  return null
}
