import { createModel } from '@rematch/core'
import type { RootModel } from './RootModel'
import { generateUsername } from '../../username'
import { KPMsg } from '../../KPPeer'

export enum ChatMode {
  UNKNOWN = 'UNKNOWN',
  CLIENT = 'CLIENT',
  HOST = 'HOST',
}

export interface ChatMessage {
  type: 'system' | 'self' | 'user'
  text: string
  timestamp: number
  sender?: string
}

interface ChatState {
  mode: ChatMode
  dataLoaded: boolean
  usernameGenerated: boolean
  username: string
  messages: ChatMessage[]
}

function timestampNow(): number {
  return new Date().getTime()
}

function createSystemMessage(text: string): ChatMessage {
  return {
    type: 'system',
    text,
    sender: 'system',
    timestamp: timestampNow(),
  }
}

function createOwnMessage(text: string): ChatMessage {
  return {
    type: 'self',
    text,
    sender: 'self',
    timestamp: timestampNow(),
  }
}

export const chat = createModel<RootModel>()({
  state: {
    mode: ChatMode.UNKNOWN,
    dataLoaded: false,
    usernameGenerated: false,
    username: null,
    messages: [createSystemMessage('Добро пожаловать на КиноВечеринку 🎉')],
  } as ChatState,
  reducers: {
    selectMode(state, mode: ChatMode) {
      state.mode = mode
    },
    onConnectedToServer(state) {
      state.messages.push(createSystemMessage('Подключились к вечеринке! 🎉'))
      if (state.usernameGenerated) {
        state.messages.push(
          createSystemMessage(
            `Наш искусственный интеллект придумал вам имя ${state.username}. Чтобы изменить его, нажми на шестерёнку в правом верхнем углу.`
          )
        )
      }
    },
    onPlay(state) {
      state.messages.push(createSystemMessage('Вы воспроизвели видео'))
    },
    onPause(state) {
      state.messages.push(createSystemMessage('Вы поставили видео на паузу'))
    },
    onHostPlay(state) {
      state.messages.push(createSystemMessage('Хост запустил видео'))
    },
    onHostPause(state) {
      state.messages.push(createSystemMessage('Хост поставил видео на паузу'))
    },
    onUserConnected(state, username: string) {
      state.messages.push(
        createSystemMessage(`${username} теперь на вечеринке!`)
      )
    },
    sendMessage(state, text: string) {
      state.messages.push(createOwnMessage(text))
    },
    messageReceived(state, msg: ChatMessage) {
      console.log('chat msg received', msg)
      state.messages.push(msg)
    },
    generateUsername(state) {
      state.username = generateUsername()
      state.usernameGenerated = true
    },
    dataLoaded(state, { username }) {
      state.username = username
      state.dataLoaded = true
    },
  },
  effects: (dispatch) => ({
    onConnectedToServer(_, state) {
      dispatch.peer.sendToServer({
        type: 'meta',
        payload: { username: state.chat.username },
      })
    },
    persistData(_, state) {
      const toStore = {
        username: state.chat.username,
      }
      localStorage.setItem('chatData', JSON.stringify(toStore))
    },
    tryLoadData() {
      const lsItem = localStorage.getItem('chatData')
      if (lsItem !== null) {
        const data = JSON.parse(lsItem)
        if (data.username) {
          dispatch.chat.dataLoaded({ username: data.username })
        }
      } else {
        dispatch.chat.generateUsername()
      }
    },
    async sendMessage(text: string, state) {
      const msg: KPMsg = {
        type: 'chat_msg',
        payload: {
          type: 'user',
          sender: state.chat.username,
          time: timestampNow(),
          text,
        },
      }
      if (state.chat.mode === ChatMode.HOST) {
        dispatch.peer.sendToAll(msg)
      } else if (state.chat.mode === ChatMode.CLIENT) {
        dispatch.peer.sendToServer(msg)
      }
    },
    generateUsername() {
      dispatch.chat.persistData(void 0)
    },
  }),
})
