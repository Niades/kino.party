import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'
import { YourID } from '../../components/YourID'
import { Status } from '../../components/Status'
import { ClientsList } from '../../components/ClientsList'
import { Chat } from '../../components/Chat'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import styled from '@emotion/styled'
import { ChatMode } from '../../../store/models/chat'
import { Logo68 } from '../../components/Logo'

const TopBarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`

const TopBarLogoContainer = styled.div`
  position: absolute;
  right: -10px;
  top: -14px;
`

const TopBarButton = styled.div`
  display: inline-block;
  cursor: pointer;

  > svg {
    width: 30px;
    color: #b8b8b8;
  }
`

function BackButton() {
  const navigate = useNavigate()
  return (
    <TopBarButton>
      <ArrowLeftIcon onClick={() => navigate(-1)} />
    </TopBarButton>
  )
}

function SettingsButton() {
  return (
    <TopBarButton>
      <Cog6ToothIcon />
    </TopBarButton>
  )
}

function TopBarLogo() {
  return (
    <TopBarLogoContainer>
      <Logo68 />
    </TopBarLogoContainer>
  )
}

function TopBar() {
  const isOpen = useSelector<RootState, boolean>((state) => state.peer.open)
  const connectedTo = useSelector<RootState, string | undefined>(
    (state) => state.peer.connectedTo
  )
  const connectionsCount = useSelector<RootState, number>(
    (state) => state.peer.connectedPeers.length
  )
  return (
    <TopBarContainer>
      <Status
        open={isOpen}
        connectedTo={connectedTo}
        connectedPeers={connectionsCount}
      />
      <TopBarLogo />
    </TopBarContainer>
  )
}

function Dashboard() {
  const mode = useSelector<RootState, ChatMode>((state) => state.chat.mode)
  const id = useSelector<RootState, string | undefined>(
    (state) => state.peer.id
  )
  return (
    <>
      <TopBar />
      {mode === ChatMode.HOST && (
        <>
          <YourID id={id !== undefined ? id : ''} />
          <ClientsList />
        </>
      )}
      <Chat />
    </>
  )
}

export { Dashboard }
