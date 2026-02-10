import { getSession } from '@/server/better-auth/server'
import { GoogleButton } from './GoogleButton'
import { LogoutButton } from './LogoutButton'
import { LinkedinButton } from './LinkedinButton'
import { MeMenu } from './MeMenu'
import { SettingsDialog } from '@/app/_components/setup-ai/SettingsDialog'
import { env } from '@/env'
import { Button } from '@/components/ui/button'
import { useAppState } from '../3d/World/useAppState'
import { AvatarPickerButton } from '../3d/World/Overlay'

export async function ServerAuthButton() {
  const session = await getSession()
  const baseURL = env.BETTER_AUTH_URL

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
                <div className='w-full mb-3'>
                  <LinkedinButton></LinkedinButton>
                </div>
                <div className='w-full'>
                  <AvatarPickerButton></AvatarPickerButton>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex items-center'>
                <AvatarPickerButton></AvatarPickerButton>
                <SettingsDialog baseURL={baseURL}></SettingsDialog>
                <MeMenu></MeMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
