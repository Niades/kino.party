import React, { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import type { Dispatch, RootState } from '../../../store'
import type { ChatMessage } from '../../../store/models/chat'
import { DashboardBlock } from '../DashboardBlock'
import { Input } from '../Input'
import { Button } from '../Button'

interface ChatMessageProps {
  sender: string
  text: string
}

interface SystemMessageProps {
  text: string
}

const MessagesContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  border-radius: 6px;
  min-height: 200px;
  max-height: 300px;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 5px;
  background-color: #181622;
`

const MessageContainer = styled.div`
  background-color: #332f47;
  position: relative;
  padding: 25px 5px 5px 5px;
  margin: 5px 0;
`

const MessageSender = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  color: #b8b8b8;
`

function ChatMessage(props: ChatMessageProps) {
  const { sender, text } = props
  return (
    <MessageContainer>
      <MessageSender>{sender}</MessageSender>
      <span>{text}</span>
    </MessageContainer>
  )
}

function SystemMessage(props: SystemMessageProps) {
  const { text } = props
  return (
    <div>
      <span style={{ color: '#B8B8B8' }}>{text}</span>
    </div>
  )
}

function renderMessage(msg: ChatMessage): ReactNode {
  switch (msg.type) {
    case 'self':
      return <ChatMessage sender="Вы" text={msg.text} />
      break
    case 'system':
      return <SystemMessage text={msg.text} />
      break
    case 'user':
      return <ChatMessage sender={msg.sender} text={msg.text} />
      break
    default:
      return <div></div>
      break
  }
}

function Chat() {
  const dispatch = useDispatch<Dispatch>()
  const messages = useSelector<RootState, ChatMessage[]>(
    (state) => state.chat.messages
  )
  const [msg, setMsg] = useState('')
  const sendMessage = useCallback(() => {
    dispatch.chat.sendMessage(msg)
    setMsg('')
  }, [dispatch, msg])
  return (
    <DashboardBlock title="Чат">
      <MessagesContainer>
        {messages.map((msg) => renderMessage(msg))}
      </MessagesContainer>
      <Input
        placeholder="Введите сообщение"
        value={msg}
        onChange={(text) => setMsg(text)}
        onEnterPress={sendMessage}
        button={<Button onClick={sendMessage} text="Отправить" />}
      />
    </DashboardBlock>
  )
}

export { Chat }
