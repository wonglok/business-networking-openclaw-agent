'use client'

import { useEffect } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import type { WebSocketEventListenerMap } from 'reconnecting-websocket/dist/events'

export default function Page() {
  useEffect(() => {
    const devURL = 'wss://7tono9e9d4.execute-api.ap-east-1.amazonaws.com/$default'

    const rws = new ReconnectingWebSocket(async () => {
      return devURL
    })

    const onOpen = () => {
      rws.send(
        JSON.stringify({
          action: 'onDefaultMessage',
          hi: 'message-onDefaultMessage',
        }),
      )

      // rws.send(
      //   JSON.stringify({
      //     action: 'onSendMessage',
      //     hi: 'message-onSendMessage',
      //   }),
      // )

      // rws.send(
      //   JSON.stringify({
      //     action: 'onJoinRoom',
      //     hi: 'message-onJoinRoom',
      //   }),
      // )

      // rws.send(
      //   JSON.stringify({
      //     action: 'onLeaveRoom',
      //     hi: 'message-onLeaveRoom',
      //   }),
      // )
    }

    //

    const onMessage = (ev: any) => {
      //
      console.log(ev)
    }

    rws.addEventListener('open', onOpen)
    rws.addEventListener('message', onMessage)

    return () => {
      rws.removeEventListener('open', onOpen)
      rws.removeEventListener('message', onMessage)
      //
      rws.close()
    }
  }, [])

  return <></>
}
