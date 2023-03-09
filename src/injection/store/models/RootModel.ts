import { Models } from '@rematch/core'
import { peer } from './peer'
import { video } from './video'
import { chat } from './chat'
import { theme } from './theme'

export interface RootModel extends Models<RootModel> {
  peer: typeof peer
  video: typeof video
  chat: typeof chat
  theme: typeof theme
}

export const models: RootModel = { peer, video, chat, theme }
