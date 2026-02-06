// import { headers } from 'next/headers'
// import Link from 'next/link'
// import { redirect } from 'next/navigation'

// import { LatestPost } from '@/app/_components/post'
// import { auth } from "@/server/better-auth";
import { HydrateClient } from '@/trpc/server'
// import { Suspense } from 'react'
import { CheckClaim } from './_components/auth/CheckClaim'
import dynamic from 'next/dynamic'
import { ServerAuthButton } from './_components/auth/ServerAuthButton'
import { Banner } from './_components/auth/Banner'
import { ClawButton } from './_components/auth/ClawButton'

const GamePage = dynamic(() => import('./_components/3d/World/GamePage').then((r) => r.GamePage), {})

export default async function Home() {
  return (
    <HydrateClient>
      <CheckClaim></CheckClaim>

      <div className='w-full h-full'>
        <GamePage></GamePage>
      </div>

      <div
        className=' absolute top-[28px] flex flex-col items-center  justify-center '
        style={{ width: `250px`, left: `calc(calc(50% - 250px / 2))` }}
      >
        <div>
          <Banner></Banner>
        </div>
        <div></div>
      </div>

      <div className=' absolute top-3 right-3 '>
        <ServerAuthButton></ServerAuthButton>
      </div>
      <div className=' absolute top-3 left-3 '>
        <ClawButton></ClawButton>
      </div>
    </HydrateClient>
  )
}
