'use client'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export function MarkNeedRedirect() {
  const params = useParams()
  const claimId = params.claimId

  useEffect(() => {
    if (claimId) {
      localStorage.setItem(`claimId`, `${claimId}`)
    }
  }, [claimId])

  return null
}
