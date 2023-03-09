import React from 'react'
import styled from '@emotion/styled'

interface StatusProps {
  open: boolean
  connectedTo?: string
  connectedPeers: number
}

interface ConnectedStatusProps {
  peerId: string
}

interface StatusWrapperProps {
  color: string
}

const StatusWrapper = styled.span<StatusWrapperProps>`
  color: #ffffff;
  background-color: ${(props) => props.color};
  padding: 3px 7.5px;
  border-radius: 9px;
`

function IdleStatus() {
  return <StatusWrapper color="#B8B8B8">Ждём гостей</StatusWrapper>
}

function ConnectingStatus() {
  return <StatusWrapper color="#B8B8B8">Подключение...</StatusWrapper>
}

function HostStatus() {
  return <StatusWrapper color="#351AA1">Хост</StatusWrapper>
}

function ConnectedStatus(props: ConnectedStatusProps) {
  return <StatusWrapper color="green">Подключено</StatusWrapper>
}

function Status(props: StatusProps) {
  let statusComponent
  if (props.open) {
    if (props.connectedTo) {
      statusComponent = <ConnectedStatus peerId={props.connectedTo} />
    } else {
      if (props.connectedPeers > 0) {
        statusComponent = <HostStatus />
      } else {
        statusComponent = <IdleStatus />
      }
    }
  } else {
    statusComponent = <ConnectingStatus />
  }
  return statusComponent
}

export { Status }
