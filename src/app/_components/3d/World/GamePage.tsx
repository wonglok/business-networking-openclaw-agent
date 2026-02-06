'use client'

// useEffect, useMemo, useState

// import { Joystick, VirtualButton } from 'bvhecctrl'

import { Suspense } from 'react'
import { CanvasGPU } from '../CanvasGPU/CanvasGPU'
import { Bvh } from '@react-three/drei'
import { EnvLoader } from '../CanvasGPU/EnvLoader'
import { JoystickControls } from './JoystickControls'
import { GameSystem } from './GameSystem'
import { useAppState } from './useAppState'

export function GamePage() {
  const visible = useAppState((r) => r.visible)

  return (
    <div className='w-full h-full relative'>
      <CanvasGPU webgpu>
        <Suspense fallback={null}>
          <Bvh firstHitOnly>
            <EnvLoader
              //
              url={`/hdr/default.hdr`}
            ></EnvLoader>

            <group visible={visible}>
              <GameSystem glbSRC={`/env/digital-palace-loklok.glb`}></GameSystem>
            </group>
          </Bvh>
        </Suspense>
      </CanvasGPU>

      <JoystickControls></JoystickControls>
    </div>
  )
}

//
