import { getSession } from '@/server/better-auth/server'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { auth } from '@/server/better-auth'
import { DoorOpen } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function MeMenu() {
  const session = await getSession()

  return (
    <>
      {session?.user?.image ? (
        <div className='flex items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='h-[40px]'>
                <img
                  src={`${session?.user?.image}`}
                  alt='user profile image'
                  className='mr-2 h-[30px] rounded-2xl'
                ></img>
                <span>{`${session?.user?.name}`}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Acccount</DropdownMenuLabel>
                <DropdownMenuItem>Your Company</DropdownMenuItem>
                <DropdownMenuItem>Your AI Agents</DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form>
                    <button
                      className='flex items-center'
                      formAction={async () => {
                        'use server'
                        await auth.api.signOut({
                          headers: await headers(),
                        })
                        redirect('/')
                      }}
                    >
                      <DoorOpen className='text-black mr-2'></DoorOpen>
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>Welcoem back!</>
      )}
    </>
  )
}
