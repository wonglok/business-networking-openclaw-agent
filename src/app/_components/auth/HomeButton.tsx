// import { getSession } from '@/server/better-auth/server'
// import { LoginButton } from './LoginButton'
// import { LogoutButton } from './LogoutButton'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

export async function HomeButton() {
  return (
    <>
      <div>
        <div className='flex justify-center'>
          {/*  */}

          <Link href={`/`}>
            <button className='inline-flex p-2 bg-[#4e4e4e55] border-2 border-white text-white rounded-lg px-5 select-none cursor-pointer'>
              <HomeIcon className='mr-2'></HomeIcon> Home
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

//
