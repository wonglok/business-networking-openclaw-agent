import { getSession } from '@/server/better-auth/server'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'

export async function ServerAuthButton() {
  const session = await getSession()

  return (
    <>
      <div>
        <div className='flex justify-center'>
          {/*  */}
          {!session ? <LoginButton></LoginButton> : <LogoutButton></LogoutButton>}
        </div>
      </div>
    </>
  )
}
