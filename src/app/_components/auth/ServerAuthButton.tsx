import { getSession } from '@/server/better-auth/server'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'
import { LinkedinButton } from './LinkedinButton'

export async function ServerAuthButton() {
  const session = await getSession()

  return (
    <>
      <div>
        <div className='flex justify-center'>
          {!session ? (
            <>
              <div className=' flex justify-center flex-col items-center'>
                <div className='mb-3 w-full'>
                  <LoginButton></LoginButton>
                </div>
                <div className='w-full'>
                  <LinkedinButton></LinkedinButton>
                </div>
              </div>
            </>
          ) : (
            <LogoutButton></LogoutButton>
          )}
        </div>
      </div>
    </>
  )
}
