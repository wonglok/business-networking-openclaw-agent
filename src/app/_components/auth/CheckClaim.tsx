'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function CheckClaim() {
  const router = useRouter()
  useEffect(() => {
    // claimId
    const claimId = localStorage.getItem('claimId')
    if (claimId && router && claimId !== 'null') {
      console.log(claimId)
      router.push(`/activate-agent/${claimId}`)
    }
    //
  }, [router])

  return null
}
