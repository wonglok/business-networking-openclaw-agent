import { getSession } from '@/server/better-auth/server'
import { GoogleButton } from './GoogleButton'
import { LogoutButton } from './LogoutButton'
import { LinkedinButton } from './LinkedinButton'
import { MeMenu } from './MeMenu'

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
                  <GoogleButton></GoogleButton>
                </div>
                <div className='w-full'>
                  <LinkedinButton></LinkedinButton>
                </div>
              </div>
            </>
          ) : (
            <>
              <MeMenu></MeMenu>
              {/* <LogoutButton></LogoutButton> */}
            </>
          )}
        </div>
      </div>
    </>
  )
}
