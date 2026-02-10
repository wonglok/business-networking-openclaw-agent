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
// import { SkinedMeshEffect } from '../../SkinnedMesh/SkinedMeshEffect'
// import { SkinedMeshAnimatedGLB } from '../../SkinnedMesh/SkinedMeshAnimatedGLB'
import { AnimatedLobster } from '../../SkinnedMesh/AnimatedLobster'
import { Overlay } from './Overlay'
// import copy from 'copy-to-clipboard'

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
              {/* <SkinedMeshAnimatedGLB
                fbxURL={`/avatar/lobsters/chef/motion/happy-state.fbx`}
                glbURL={`/avatar/lobsters/chef/mixa-lobster-transformed.glb`}
              ></SkinedMeshAnimatedGLB> */}

              <group
                name='near-water-r'
                scale={5}
                position={[4.046127052562055, -1.6848011016845703, -31.98570839489203]}
              >
                <Suspense fallback={null}>
                  <AnimatedLobster
                    fbxURL={`/avatar/lobsters/chef/motion/twist-dance.fbx`}
                    glbURL={`/avatar/lobsters/guy/lobster-mixamo-transformed.glb`}
                  ></AnimatedLobster>
                </Suspense>
              </group>

              {/* public/ */}

              <group
                name='near-water'
                scale={7}
                position={[-0.09289114319543201, -1.3125008792877197, -31.45930003386298]}
              >
                <Suspense fallback={null}>
                  <AnimatedLobster
                    glbURL={`/avatar/lobsters/chef/mixa-lobster-transformed.glb`}
                    fbxURL={`/avatar/lobsters/chef/motion/standing-clap.fbx`}
                  ></AnimatedLobster>
                </Suspense>
              </group>

              <group
                name='near-water-l'
                scale={5}
                position={[-4.046127052562055, -1.6848011016845703, -31.98570839489203]}
              >
                <Suspense fallback={null}>
                  <AnimatedLobster
                    glbURL={`/avatar/lobsters/lady/lady-lobster-mixa-transformed.glb`}
                    fbxURL={`/avatar/lobsters/chef/motion/happy-state.fbx`}
                  ></AnimatedLobster>
                </Suspense>
              </group>

              <GameSystem glbSRC={`/env/digital-palace-loklok.glb`}></GameSystem>

              {/* 
              
              <SkinedMeshEffect masterName='main-player'></SkinedMeshEffect> 
              
              */}
            </group>
          </Bvh>
        </Suspense>
      </CanvasGPU>

      <JoystickControls></JoystickControls>
    </div>
  )
}

//
