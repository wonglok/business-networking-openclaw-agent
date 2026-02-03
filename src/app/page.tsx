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

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession()

  return (
    <HydrateClient>
      <CheckClaim></CheckClaim>
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16'>
          <div className='flex flex-col items-center gap-2'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <div className='text-center text-2xl '>{session && <span>Logged in as {session?.user?.name}</span>}</div>
              {!session ? <LoginButton></LoginButton> : <LogoutButton></LogoutButton>}
            </div>
          </div>

          {/* <Suspense fallback={null}>{session?.user && <LatestPost />}</Suspense> */}
        </div>
      </main>
    </HydrateClient>
  )
}
