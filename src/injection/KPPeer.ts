import { Peer, DataConnection } from 'peerjs'
import uniqid from 'uniqid'
import { createLogger } from './log'
import { EventBus } from './EventBus'
import type { Dispatch } from './store/index'
import { ChatMessage } from './store/models/chat'

const log = createLogger('KPPeer')
const genId = uniqid

export enum PeerMode {
  IDLE,
  SERVER,
  CLIENT,
}

export type KPMsgType = 'play' | 'pause' | 'meta' | 'chat_msg'
export type KPMsgHandler = (msg: KPMsg) => void

export interface KPMsg {
  type: KPMsgType
  payload?: any
}

interface KPServerConnection {
  peerConnection: DataConnection
}

interface KPClientConnection {
  clientId: string
  peerConnection: DataConnection
}

function enforceMode(forceMode: PeerMode): Function {
  return function (target: any) {
    const peer = target as KPPeer
    if (peer._mode != forceMode) {
      log('WARN: mode violation')
    }
  }
}

class KPPeer {
  _id: string | null = null
  _connectToRemembered: string | null = null
  _dispatch: Dispatch
  _mode: PeerMode
  _peer: Peer
  _serverConn: KPServerConnection | undefined
  _connections: KPClientConnection[]
  _eb: EventBus

  constructor() {
    this._mode = PeerMode.IDLE
    this._peer = new Peer()
    this._peer.on('open', this._onPeerOpen.bind(this))
    this._peer.on('connection', this._onPeerConnection.bind(this))
    this._eb = new EventBus()
    this._connections = []
    this.onMessage('pause', (msg) => {
      if (this._dispatch) {
        this._dispatch.video.seekTo(msg.payload.time)
        this._dispatch.video.pause()
        this._dispatch.chat.onHostPause()
      }
    })
    this.onMessage('play', (msg) => {
      if (this._dispatch) {
        this._dispatch.video.seekTo(msg.payload.time)
        this._dispatch.video.play()
        this._dispatch.chat.onHostPlay()
      }
    })
    this.onMessage('chat_msg', (msg) => {
      if (this._dispatch) {
        this._dispatch.chat.messageReceived(msg.payload)
      }
    })
  }

  setDispatch(dispatch: Dispatch) {
    this._dispatch = dispatch
  }

  waitForOpen(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._peer.on('open', function () {
        resolve()
      })
    })
  }

  _onPeerOpen(id: string) {
    this._id = id
    if (this._dispatch) {
      this._dispatch.peer.opened(id)
    }
    log('connection open, id=', id)
    if(this._connectToRemembered !== null) {
      log('connecting to remembered peerId')
      this.connect(this._connectToRemembered)
      this._connectToRemembered = null
    }
  }

  _onPeerConnection(conn: DataConnection) {
    const id = genId()
    this._connections.push({
      clientId: id,
      peerConnection: conn,
    })
    if (this._dispatch) {
      this._dispatch.peer.peerConnected(id)
    }
    conn.on('data', (data) => {
      const msg = data as KPMsg
      this._onPeerData(id, msg)
    })
    log('new peer connected!')
  }

  _onPeerData(peerId: string, msg: KPMsg) {
    console.log('received <', msg.type, '> from ', peerId)
    if (msg.type === 'meta') {
      const c = this._findClientById(peerId)
      if (c !== undefined) {
        if (this._dispatch) {
          this._dispatch.peer.peerMetadataReceived({
            id: peerId,
            metadata: msg.payload,
          })
        }
      }
    } else if (msg.type === 'chat_msg') {
      if (this._dispatch) {
        this._dispatch.chat.messageReceived(msg.payload as ChatMessage)
      }
    }
  }

  _onServerData(untypedData: unknown) {
    const msg = untypedData as KPMsg
    log('received <', msg.type, '>')
    this._eb.emit({ key: msg.type, payload: msg })
  }

  _findClientById(clientId: string): KPClientConnection | undefined {
    return this._connections.find((c) => c.clientId === clientId)
  }

  _sendMsg(clientId: string, msg: KPMsg) {
    const conn = this._findClientById(clientId)
    if (conn) {
      console.log({ conn })
      conn.peerConnection.send(msg)
      log('sent <', msg.type, '>')
    } else {
      log('WARN: client to send to not found')
    }
  }

  _sendMsgToServer(msg: KPMsg) {
    if (this._serverConn !== undefined) {
      this._serverConn.peerConnection.send(msg)
    }
  }

  @enforceMode(PeerMode.CLIENT)
  connect(peerId: string) {
    log('connecting')
    if(this._peer.open) {
      const peerConnection = this._peer.connect(peerId)
      peerConnection.on('open', () => {
        log('connected')
        if (this._dispatch) {
          this._dispatch.peer.connected(peerId)
        }
      })
      peerConnection.on('error', () => {
        log('ERROR: connection error')
      })
      peerConnection.on('data', this._onServerData.bind(this))
      this._serverConn = { peerConnection }
    } else {
      this._connectToRemembered = peerId
      log('peer not open yet, remembering peerId')
    }
  }

  onMessage(type: KPMsgType, handler: KPMsgHandler) {
    this._eb.on(type, (e) => {
      const msg = e.payload as KPMsg
      handler(msg)
    })
  }

  sendToServer(msg: KPMsg) {
    this._sendMsgToServer(msg)
  }

  sendToAll(msg: KPMsg) {
    this._connections.forEach((conn) => this._sendMsg(conn.clientId, msg))
  }

  getId() {
    return this._id
  }
}

const Singleton = new KPPeer()

export default Singleton
