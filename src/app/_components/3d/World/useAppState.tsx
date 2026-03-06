import { type NavMesh } from 'navcat'
import type ReconnectingWebSocket from 'reconnecting-websocket'
import { Group } from 'three'
import { create } from 'zustand'
export const useAppState = create(() => {
  return {
    visible: false as boolean,
    colliderSource: null as Group | null,
    //
    navMesh: null as NavMesh | null,
    chosenLobster: 'guy',
    overlay: 'avatarpicker',
    signature: '',

    otherPlayers: [],
    socket: false as WebSocket | false,
  }
})
