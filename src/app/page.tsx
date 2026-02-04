// import { headers } from 'next/headers'
// import Link from 'next/link'
// import { redirect } from 'next/navigation'

// import { LatestPost } from '@/app/_components/post'
// import { auth } from "@/server/better-auth";
import { getSession } from '@/server/better-auth/server'
import { api, HydrateClient } from '@/trpc/server'
import { LoginButton } from './_components/auth/LoginButton'
import { LogoutButton } from './_components/auth/LogoutButton'
// import { Suspense } from 'react'
import { CheckClaim } from './_components/auth/CheckClaim'
import dynamic from 'next/dynamic'

const GamePage = dynamic(() => import('./_components/3d/World/GamePage').then((r) => r.GamePage), {})

export default async function Home() {
  const session = await getSession()

  return (
    <HydrateClient>
      <CheckClaim></CheckClaim>

      <div className='w-full h-full'>
        <GamePage></GamePage>
      </div>

      <div
        className=' absolute top-[28px] flex items-center  justify-center '
        style={{ width: `250px`, left: `calc(calc(50% - 250px / 2))` }}
      >
        <div className='text-center text-2xl '>{session && <span>Logged in as {session?.user?.name}</span>}</div>
        {!session ? <LoginButton></LoginButton> : <LogoutButton></LogoutButton>}
      </div>
    </HydrateClient>
  )
}
