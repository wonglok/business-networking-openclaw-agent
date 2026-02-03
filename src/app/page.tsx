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
import { GamePage } from './_components/3d/World/GamePage'

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession()

  return (
    <HydrateClient>
      <CheckClaim></CheckClaim>

      {session && (
        <div className='w-full h-full'>
          <GamePage></GamePage>
        </div>
      )}

      <div className=' absolute top-0 right-0'>
        <div className='text-center text-2xl '>{session && <span>Logged in as {session?.user?.name}</span>}</div>
        {!session ? <LoginButton></LoginButton> : <LogoutButton></LogoutButton>}
      </div>
    </HydrateClient>
  )
}
