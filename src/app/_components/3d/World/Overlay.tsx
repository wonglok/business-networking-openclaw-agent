'use client'

import { Canvas } from '@react-three/fiber'
import { useAppState } from './useAppState'
import { Environment, PerspectiveCamera, Stage } from '@react-three/drei'
import { AnimatedLobster } from '../../SkinnedMesh/AnimatedLobster'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { CanvasGPU } from '../CanvasGPU/CanvasGPU'

export function Overlay() {
  const overlay = useAppState((r) => r.overlay)

  return (
    <>
      {overlay === 'avatarpicker' && (
        <div className=' absolute z-20 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
          <div className='text-white w-full'>
            <div className='flex w-full'>
              <div className='w-full h-[500px]'>
                <Canvas>
                  <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0.5, 2]}></PerspectiveCamera>
                    <>
                      <Environment files={[`/hdr/default.hdr`]}></Environment>

                      <group
                        onClick={() => {
                          useAppState.setState({
                            chosenLobster: 'guy',
                            overlay: '',
                          })
                        }}
                        position={[0.35, 0, 0]}
                      >
                        <AnimatedLobster
                          glbURL={`/avatar/lobsters/guy/lobster-mixamo-transformed.glb`}
                          fbxURL={`/avatar/lobsters/chef/motion/twist-dance.fbx`}
                        ></AnimatedLobster>
                      </group>

                      <group
                        onClick={() => {
                          useAppState.setState({
                            chosenLobster: 'lady',
                            overlay: '',
                          })
                        }}
                        position={[-0.35, 0, 0]}
                      >
                        <AnimatedLobster
                          glbURL={`/avatar/lobsters/lady-withdress/lady-mixamo-transformed.glb`}
                          fbxURL={`/avatar/lobsters/chef/motion/happy-state.fbx`}
                        ></AnimatedLobster>
                      </group>
                    </>
                  </Suspense>
                </Canvas>
              </div>
            </div>
            <div>
              <div className='text-2xl text-center mb-4'>Pick a Lobster</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const AvatarPickerButton = () => {
  return (
    <Button
      variant='outline'
      className='h-[40px] mr-2'
      onClick={() => {
        ///

        useAppState.setState({
          overlay: 'avatarpicker',
        })
      }}
    >
      Wardrobe
    </Button>
  )
}
