'use client'

import { Suspense, useEffect, useState } from 'react'

import { Joystick, VirtualButton } from 'bvhecctrl'

export const JoystickControls = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false)
  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchScreen(true)
    } else {
      setIsTouchScreen(false)
    }
  }, [])
  return (
    <>
      {isTouchScreen && (
        <>
          <Joystick />
          <VirtualButton id='run' label='RUN' buttonWrapperStyle={{ right: '100px', bottom: '40px' }} />
          <VirtualButton id='jump' label='JUMP' buttonWrapperStyle={{ right: '40px', bottom: '100px' }} />
        </>
      )}
      {!isTouchScreen && (
        <>
          <div className='hidden lg:flex absolute bottom-10 left-[calc(50% - 15% / 2)] w-full items-center justify-center'>
            <img className='w-[15%]' src={`/textures/instruction.png`}></img>
          </div>
        </>
      )}
    </>
  )
}
