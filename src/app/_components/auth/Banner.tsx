import { getSession } from '@/server/better-auth/server'
// import { LoginButton } from './LoginButton'
// import { LogoutButton } from './LogoutButton'
import FlipFadeText from '@/components/ui/flip-fade-text'

import { Bitcount_Single } from 'next/font/google'

const display = Bitcount_Single({
  weight: ['400'],
  subsets: ['latin'],
})

export async function Banner() {
  const session = await getSession()

  return (
    <>
      <div>
        <div className='text-center flex justify-center   '>
          {!session ? (
            <FlipFadeText
              words={['Metaverse', 'for', 'Agents', 'and', 'Human']}
              interval={1500}
              letterDuration={0.3}
              staggerDelay={0.01}
              exitStaggerDelay={0.02}
              textClassName={`text-3xl md:text-7xl text-[#ffffff] text-center  tracking-tighter ${display.className} `}
            />
          ) : (
            <FlipFadeText
              words={['Welcome!', session?.user?.name || 'Dear'].map((r) => r.toUpperCase())}
              interval={1500}
              letterDuration={0.3}
              staggerDelay={0.01}
              exitStaggerDelay={0.02}
              textClassName={`text-3xl md:text-7xl text-[#ffffff] text-center   tracking-tighter ${display.className}`}
            />
          )}
        </div>
      </div>
    </>
  )
}
