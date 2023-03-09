import { createModel } from '@rematch/core'
import type { RootModel } from './RootModel'
import KPPeer, { KPMsg, PeerMode } from '../../KPPeer'

export interface Peer {
  id: string
  metadata: any
}

interface PeerState {
  id?: string
  open: boolean
  mode?: PeerMode
  connected: boolean
  connectedTo?: string
  connectedPeers: Peer[]
  connectedPeerCount: number
  videoFound: boolean
}

export const peer = createModel<RootModel>()({
  state: {
    open: false,
    connected: false,
    connectedPeerCount: 0,
    videoFound: false,
    connectedPeers: [],
  } as PeerState,
  reducers: {
    opened(state, payload: string) {
      state.open = true
      state.id = payload
    },
    connected(state, payload: string) {
      state.connected = true
      state.connectedTo = payload
    },
    peerConnected(state, id: string) {
      state.connectedPeers.push({ id, metadata: [] })
    },
    peerDisconnected(state, id: string) {
      state.connectedPeers.splice(
        state.connectedPeers.findIndex((p) => p.id === id),
        1
      )
    },
    peerMetadataReceived(state, { id, metadata }) {
      const peer = state.connectedPeers.find((p) => p.id === id)
      if (peer !== undefined) {
        peer.metadata = metadata
      }
    },
  },
  effects: (dispatch) => ({
    connectTo(payload) {
      KPPeer.connect(payload)
    },
    connected() {
      dispatch.chat.onConnectedToServer(void 0)
    },
    peerMetadataReceived({ id, metadata }) {
      dispatch.chat.onUserConnected(metadata.username)
    },
    sendToServer(payload: KPMsg) {
      KPPeer.sendToServer(payload)
    },
    sendToAll(payload: KPMsg) {
      KPPeer.sendToAll(payload)
    },
  }),
})
