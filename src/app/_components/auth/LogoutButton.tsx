import { auth } from '@/server/better-auth'
import { getSession } from '@/server/better-auth/server'
import { DoorOpen } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function LogoutButton() {
  return (
    <>
      <form>
        <button
          className='inline-flex p-2 bg-[#4e4e4e55] border-2 border-white text-white rounded-lg px-5 select-none cursor-pointer'
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
