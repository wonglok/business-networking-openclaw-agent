// //
// const meshes: Mesh[] = []

import { CameraControls, KeyboardControls } from '@react-three/drei'
import BVHEcctrl, { characterStatus, StaticCollider, useEcctrlStore, type BVHEcctrlApi } from 'bvhecctrl'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
// import { Group, Vector3 } from 'three'
// import { useControls, folder, button } from 'leva'
import { useFrame } from '@react-three/fiber'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js'
// import Avatar from './Avatar'
import { AvatarRPM } from './AvatarRPM'
import { useAppState } from './useAppState'
import { Vector3 } from 'three'
// import { findPathByObjects } from './simple-nav'
// import { CatmullRomCurve3, Object3D, Vector3 } from 'three'
// import { gsap } from 'gsap'

export function GameSystem({ sceneDisplay }: { sceneDisplay?: ReactNode }) {
  const colliderSource = useAppState((r) => r.colliderSource)

  useEffect(() => {
    if (!colliderSource) {
      return
    }

    setTimeout(() => {
      const tt = setInterval(() => {
        if (ecctrlRef.current) {
          clearInterval(tt)

          //
          ecctrlRef.current?.resetLinVel()
          characterStatus.position.set(0, 5, 0)
          ecctrlRef.current?.group?.position.set(0, 5, 0)
        }
      }, 1)
    }, 1000)
  }, [colliderSource])

  const colliderMeshesArray = useEcctrlStore((state) => state.colliderMeshesArray)

  const camControlRef = useRef<CameraControls | null>(null)

  const ecctrlRef = useRef<BVHEcctrlApi | null>(null)

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
  ]

  useFrame((state, delta) => {
    if (camControlRef.current && ecctrlRef.current) {
      if (ecctrlRef.current.group) {
        camControlRef.current.moveTo(
          ecctrlRef.current.group.position.x,
          ecctrlRef.current.group.position.y + 0.35,
          ecctrlRef.current.group.position.z,
          true,
        )
      }

      if (ecctrlRef.current.group) {
        ecctrlRef.current.group.visible = camControlRef.current.distance > 2
      }
    }
  })

  // const navMesh = useAppState((r) => r.navMesh)

  return (
    <>
      <CameraControls
        maxDistance={30}
        ref={camControlRef}
        smoothTime={0.1}
        azimuthRotateSpeed={1}
        colliderMeshes={colliderMeshesArray}
        makeDefault
      />

      <>
        <KeyboardControls map={keyboardMap}>
          <BVHEcctrl
            position={[0, 7.5, 0]}
            ref={(v) => {
              ecctrlRef.current = v
              v?.resetLinVel()
              v?.setLinVel(new Vector3(0, 0, 0))
              v?.setMovement({
                run: false,
                jump: false,
              })
            }}
            colliderCapsuleArgs={[0.3, 0.8, 4, 8]}
          >
            <AvatarRPM></AvatarRPM>
          </BVHEcctrl>
        </KeyboardControls>

        <StaticCollider uuid={colliderSource?.uuid}>
          <group visible={true} onClick={(ev) => {}}>
            {sceneDisplay}
          </group>
        </StaticCollider>
      </>
    </>
  )
}

//
