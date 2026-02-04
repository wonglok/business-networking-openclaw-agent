'use client'

// useEffect, useMemo, useState
import { Suspense } from 'react'

// import { Joystick, VirtualButton } from 'bvhecctrl'
import { CanvasGPU } from '../CanvasGPU/CanvasGPU'
import { Bvh } from '@react-three/drei'
import { EnvLoader } from '../CanvasGPU/EnvLoader'
import { JoystickControls } from './JoystickControls'
import { GameSystem } from './GameSystem'
// import { useAppState } from './useAppState'
// import type { Scene } from 'three'

export function GamePage() {
  return (
    <div className='w-full h-full relative'>
      <CanvasGPU webgpu>
        <Suspense fallback={null}>
          <Bvh firstHitOnly>
            <EnvLoader
              //
              url={`/hdr/default.hdr`}
            ></EnvLoader>

            <GameSystem glbSRC={`/env/digital-palace-loklok.glb`}></GameSystem>
          </Bvh>
        </Suspense>
      </CanvasGPU>

      <JoystickControls></JoystickControls>
    </div>
  )
}

//
