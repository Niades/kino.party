import { createModel } from '@rematch/core'
import type { RootModel } from './RootModel'
import VideoController from '../../VideoController'
import { ChatMode } from './chat'

type VideoState = {
  selector?: string
  videoFound: boolean
}

export const video = createModel<RootModel>()({
  state: {
    videoFound: false,
  } as VideoState,
  reducers: {
    videoFound(state) {
      return {
        ...state,
        videoFound: true,
      }
    },
    videoLost(state) {
      return {
        ...state,
        videoFound: false,
      }
    },
  },
  effects: (dispatch) => {
    return {
      play() {
        VideoController.play()
      },
      pause() {
        VideoController.pause()
      },
      seekTo(time: number) {
        VideoController.seekTo(time)
      },
      onPlay(time: number, state) {
        if (state.chat.mode === ChatMode.HOST) {
          dispatch.peer.sendToAll({
            type: 'play',
            payload: {
              time,
            },
          })
          dispatch.chat.onPlay()
        }
      },
      onPause(time: number, state) {
        if (state.chat.mode === ChatMode.HOST) {
          dispatch.peer.sendToAll({
            type: 'pause',
            payload: {
              time,
            },
          })
          dispatch.chat.onPause()
        }
      },
      adaptPage() {
        VideoController._adaptPage()
      },
      revertAdaptation() {
        VideoController._revertPageAdaptation()
      }
    }
  },
})
