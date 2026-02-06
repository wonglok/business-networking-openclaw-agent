import { LoginButton } from '@/app/_components/auth/LoginButton'
import { MarkNeedRedirect } from '@/app/_components/auth/MarkNeedRedirect'
import { Claim } from '@/app/_components/claim/claim'
import { getSession } from '@/server/better-auth/server'

export default async function Page({}) {
  const session = await getSession()

  if (!session) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div>
          <div>Please login to claim / activate agent.</div>
          <MarkNeedRedirect></MarkNeedRedirect>
          <LoginButton></LoginButton>
        </div>
      </div>
    )
  }

  return <Claim session={session}></Claim>
}
