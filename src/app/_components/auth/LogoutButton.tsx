import { auth } from '@/server/better-auth'
import { DoorOpen } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export function LogoutButton() {
  return (
    <>
      <form>
        <button
          className='inline-flex p-2 bg-white rounded-lg px-5'
          formAction={async () => {
            'use server'
            await auth.api.signOut({
              headers: await headers(),
            })
            redirect('/')
          }}
        >
          <DoorOpen className='mr-2'></DoorOpen> Logout
        </button>
      </form>
    </>
  )
}

//

//
