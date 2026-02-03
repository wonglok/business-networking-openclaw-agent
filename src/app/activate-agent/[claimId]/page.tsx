import { LoginButton } from '@/app/_components/auth/LoginButton'
import { Claim } from '@/app/_components/claim/claim'
import { getSession } from '@/server/better-auth/server'

export default async function Page({}) {
  const session = await getSession()

  if (!session) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <LoginButton></LoginButton>
      </div>
    )
  }

  return <Claim session={session}></Claim>
}
