import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { Dispatch } from '../../../store'
import { ConnectTo } from '../../components/ConnectTo'

function ConnectToHost() {
  const navigate = useNavigate()
  const dispatch = useDispatch<Dispatch>()
  return (
    <ConnectTo
      onConnectRequest={(peerId) => {
        dispatch.peer.connectTo(peerId)
        navigate('/dashboard')
      }}
    />
  )
}

export { ConnectToHost }
