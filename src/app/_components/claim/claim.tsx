'use client'

import { api } from '@/trpc/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'
//

export function Claim({ session }: any) {
  const params = useParams()

  const claimId = params.claimId

  const claim = api.agent.claimBot.useMutation({
    //
  })
  const claimStatus = api.agent.checkClaimStatusOfCode.useQuery({
    claimId: `${claimId}`,
  })

  useEffect(() => {
    if (`${claimStatus.data}` === 'claimed') {
      //
      if (claimId) {
        localStorage.setItem(`claimId`, `${claimId}`)
      }

      localStorage.removeItem('claimId')
    }
  }, [claimId, claimStatus])

  const [verificationCode, setCode] = useState('')

  if (claimStatus.isLoading) {
    return (
      <>
        <div className='p-5 w-6/12'>Loading...</div>
      </>
    )
  }

  return (
    <>
      <div className='p-5 w-6/12'>
        <FieldSet>
          <FieldLegend>Setup your Bot</FieldLegend>
          <FieldDescription>Associate bot with you.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Claim Token</FieldLabel>
              <FieldDescription>Bot's Claim Code</FieldDescription>
              <Input disabled value={claimId} />
            </Field>

            {claimStatus.data !== 'claimed' && (
              <Field>
                <FieldLabel htmlFor='verificationCode'>Verfiication Code</FieldLabel>
                <FieldDescription>Claim the bot to be you.</FieldDescription>
                <Input
                  id='verificationCode'
                  value={verificationCode}
                  onChange={(ev) => {
                    setCode(ev.target.value)
                  }}
                  autoComplete='off'
                />
              </Field>
            )}

            {claimStatus.data !== 'claimed' && (
              <Field>
                <Button
                  onClick={() => {
                    claim
                      .mutateAsync({
                        claimId: `${claimId}`,
                        verificationCode: `${verificationCode}`,
                      })
                      .then((data) => {
                        //
                        if (data.ok) {
                          //
                          localStorage.removeItem(`claimId`)
                          toast.success('Successfully claim the bot to be yours.', {
                            position: 'top-center',
                          })
                          claimStatus.refetch()
                        }
                      })
                  }}
                >
                  Verify and Claim the Bot
                </Button>
              </Field>
            )}

            {claimStatus.data === 'claimed' && (
              <Field>
                <Button disabled>This Bot is Claimed</Button>
              </Field>
            )}

            {claimStatus.data === 'claimed' && (
              <Field>
                <>
                  <Link href={`/`}>
                    <Button variant={'outline'} className='bg-[#4726ff] text-white'>
                      Reutrn Home
                    </Button>
                  </Link>
                </>
              </Field>
            )}

            {/*
             */}

            {/*  */}
          </FieldGroup>
        </FieldSet>
      </div>
    </>
  )
}
