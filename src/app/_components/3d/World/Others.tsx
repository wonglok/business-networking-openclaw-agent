import { Suspense, useEffect, useMemo, useRef } from 'react'
import { useAppState } from './useAppState'
import { env } from '@/env'
// import ReconnectingWebSocket from 'reconnecting-websocket'
import { NEXT_PUBLIC_WS_DEV_URL, NEXT_PUBLIC_WS_PROD_URL } from 'socket.config'
import { useFrame, useThree } from '@react-three/fiber'
import { Object3D, Quaternion, Vector3 } from 'three'
import { Sphere } from '@react-three/drei'
import { AvatarLobsterAI } from './AvatarLobsterAI'

//

export function Others({ roomID = 'lobby' }) {
  const scene = useThree((r) => r.scene)
  useEffect(() => {
    const url = env.NEXT_PUBLIC_ENV === 'production' ? NEXT_PUBLIC_WS_PROD_URL : NEXT_PUBLIC_WS_DEV_URL

    const socket = new WebSocket(`${url}`)

    const signature = `_${Math.random().toString(36).slice(2, 9)}`

    socket.onopen = () => {
      //

      useAppState.setState({
        socket: socket,
        signature,
      })

      // const mainPlayer = scene.getObjectByName('main-player')
      // if (mainPlayer) {
      //   //
      //   const o3 = new Object3D()

      //   mainPlayer.getWorldPosition(o3.position)
      //   mainPlayer.getWorldQuaternion(o3.quaternion)

      //   socket.send(
      //     JSON.stringify({
      //       action: 'onJoinRoom',
      //       roomID: roomID,
      //       signature: signature,

      //       chosenLobster: useAppState.getState().chosenLobster,
      //       //
      //       quaternion: o3.quaternion.toArray(),
      //       target: o3.position.toArray(),
      //       position: o3.position.toArray(),
      //     }),
      //   )
      // }
    }

    let sig = ''
    let needsUpdate = true
    const repeatChecker = setInterval(() => {
      const o3 = new Object3D()
      const mainPlayer = scene.getObjectByName('main-player')
      if (mainPlayer) {
        mainPlayer.getWorldPosition(o3.position)
        const now = JSON.stringify({
          p: o3.position.toArray().map((r) => r.toFixed(2)),
        })
        if (sig === now) {
          return
        }

        needsUpdate = true

        sig = now
      }
    }, 100)

    const repeatSync = setInterval(() => {
      //
      const mainPlayer = scene.getObjectByName('main-player')
      if (mainPlayer) {
        const o3 = new Object3D()

        mainPlayer.getWorldPosition(o3.position)
        mainPlayer.getWorldQuaternion(o3.quaternion)

        // console.log(socket.readyState, socket.OPEN)

        if (socket.readyState === socket.OPEN && needsUpdate) {
          needsUpdate = false

          socket.send(
            JSON.stringify({
              action: 'onMove',
              roomID: roomID,
              signature: signature,

              chosenLobster: useAppState.getState().chosenLobster,

              //
              quaternion: o3.quaternion.toArray(),
              target: o3.position.toArray(),
              position: o3.position.toArray(),
            }),
          )
        }
      }
    }, 2500)

    socket.onmessage = (ev) => {
      const data = JSON.parse(ev.data)
      console.log('data', data)
      if (data.players) {
        useAppState.setState({
          otherPlayers: data.players,
        })
      }
    }

    return () => {
      clearInterval(repeatChecker)
      clearInterval(repeatSync)

      // socket.send(
      //   JSON.stringify({
      //     action: 'onLeaveRoom',
      //     roomID: roomID,
      //   }),
      // )

      socket.close()
    }
  }, [])

  return (
    <>
      <OtherPlayers></OtherPlayers>
    </>
  )
}

function OtherPlayers() {
  const otherPlayers = useAppState((r) => r.otherPlayers)
  const signature = useAppState((r) => r.signature)
  const map = useMemo(() => {
    return new Map()
  }, [])

  return (
    <>
      {otherPlayers
        .filter((r: any) => r.signature !== signature)
        .reduce((acc, val, key) => {
          if (acc.length === 0) {
            map.clear()
          }
          if (!map.has(`i-${key}`)) {
            map.set(`i-${key}`, val)
            acc.push(val)
          }

          return acc
        }, [])
        .map((player: any) => {
          return (
            <group key={player.itemID}>
              {/*  */}

              <LerpPos quaternion={player.quaternion} position={player.position}>
                {player.chosenLobster === 'guy' && (
                  <>
                    <Suspense fallback={null}>
                      <group position={[0, 0.15, 0]}>
                        <AvatarLobsterAI
                          forceIdle
                          key={player.itemID + 'pl'}
                          lobsterURL={`/avatar/lobsters/cowboy/mixamo-cowbody-rigged-transformed.glb`}
                        ></AvatarLobsterAI>
                      </group>
                    </Suspense>
                  </>
                )}

                {player.chosenLobster === 'lady' && (
                  <>
                    <Suspense fallback={null}>
                      <group position={[0, 0.075, 0]}>
                        <AvatarLobsterAI
                          forceIdle
                          key={player.itemID + 'pl'}
                          lobsterURL={`/avatar/lobsters/lady-withdress/lady-mixamo-transformed.glb`}
                        ></AvatarLobsterAI>
                      </group>
                    </Suspense>
                  </>
                )}
              </LerpPos>
            </group>
          )
        })}
    </>
  )
}
//

function LerpPos({ position, quaternion, children }: any) {
  const ref = useRef<any>(null)
  const q = useMemo(() => {
    return new Quaternion()
  }, [])
  const p = useMemo(() => {
    return new Vector3()
  }, [])

  p.fromArray(position)
  q.fromArray(quaternion)

  useFrame(() => {
    ref.current.position.lerp(p, 0.05)
    ref.current.quaternion.slerp(q, 0.05)
  })

  return <group ref={ref}>{children}</group>
}
