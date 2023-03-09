import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import { peer, Peer } from '../../../store/models/peer'

function ClientsList() {
  const peers = useSelector<RootState, Peer[]>(
    (state) => state.peer.connectedPeers
  )
  const you = useSelector<RootState, string>((state) => state.chat.username)
  return (
    <div>
      {peers.length === 0 && <span>Пока никто не подключился...</span>}
      {peers.length > 0 && <span>Гостей: {peers.length}</span>}
    </div>
  )
}

export { ClientsList }
