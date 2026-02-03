'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'

import { Joystick, VirtualButton } from 'bvhecctrl'
import { CanvasGPU } from '../CanvasGPU/CanvasGPU'
import { Bvh, useGLTF } from '@react-three/drei'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { EnvLoader } from '../CanvasGPU/EnvLoader'
import { JoystickControls } from './JoystickControls'
import { GameSystem } from './GameSystem'
import { useAppState } from './useAppState'

export function GamePage() {
  return (
    <div className='w-full h-full relative'>
      <CanvasGPU webgpu>
        <Suspense fallback={null}>
          <Bvh firstHitOnly>
            <EnvLoader url={`/hdr/default.hdr`}></EnvLoader>
            <GameSystem sceneDisplay={<ContentGL></ContentGL>}></GameSystem>
          </Bvh>
        </Suspense>
      </CanvasGPU>

      <JoystickControls></JoystickControls>
    </div>
  )
}

function ContentGL() {
  const glb = useGLTF('/env/digital-palace-loklok.glb') as any

  const cloned = useMemo(() => {
    return clone(glb?.scene) as any
  }, [glb?.scene?.uuid])

  useEffect(() => {
    useAppState.setState({
      colliderSource: cloned,
    })
  }, [cloned.uuid])

  return (
    <>
      <group
        onClick={(ev) => {
          console.log('clicked', ev.point.toArray(), ev.object.name)
        }}
      >
        <primitive object={cloned}></primitive>
      </group>
    </>
  )
}
