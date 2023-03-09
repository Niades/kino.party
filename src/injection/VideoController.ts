import type { Dispatch } from './store'
import { createLogger } from './log'
import { PageAdaptor } from './page-adaptor/adaptor'
import { KinopoiskAdaptor } from './page-adaptor/KinopoiskAdaptor'

const log = createLogger('VideoController')

class VideoController {
  _interval: NodeJS.Timer
  _video: HTMLVideoElement
  _storeDispatch: Dispatch
  _adaptors: PageAdaptor[] = [new KinopoiskAdaptor()]
  _selectedAdaptor: PageAdaptor = null

  setDispatch(d: Dispatch) {
    this._storeDispatch = d
  }

  start(ms = 100) {
    this._interval = setInterval(() => {
      this._updateVideoIfNeeded()
    }, ms)
  }

  _findVideo(): HTMLVideoElement | undefined {
    const videos = document.getElementsByTagName('video')
    if (videos.length > 0) {
      return videos[0]
    } else {
      return undefined
    }
  }

  _onPlay() {
    log('play fired')
    if (this._storeDispatch && this._video) {
      this._storeDispatch.video.onPlay(this._video.currentTime)
    }
  }

  _onPause() {
    log('pause fired')
    if (this._storeDispatch && this._video) {
      this._storeDispatch.video.onPause(this._video.currentTime)
    }
  }

  play() {
    if (this._video !== undefined) {
      this._video.play()
    }
  }

  pause() {
    if (this._video !== undefined) {
      this._video.pause()
    }
  }

  seekTo(time: number) {
    if (this._video !== undefined) {
      this._video.currentTime = time
    }
  }

  _adaptPage() {
    const currentUrl: string = location.href
    const adaptor = this._adaptors.find((a) => a.isUrlSupported(currentUrl))
    if (adaptor !== undefined) {
      adaptor.adaptPage()
      this._selectedAdaptor = adaptor
    } else {
      log('WARN: no adaptors support', currentUrl)
    }
  }

  _revertPageAdaptation() {
    if (this._selectedAdaptor !== null) {
      this._selectedAdaptor.revertAdaptation()
      this._selectedAdaptor = null
    } else {
      log('ERROR: no adaptor applied, cannot revert')
    }
  }

  _setVideo(video: HTMLVideoElement) {
    log('grabbed video')
    video.addEventListener('play', this._onPlay.bind(this))
    video.addEventListener('pause', this._onPause.bind(this))
    video.pause()
    this._adaptPage()

    // TODO: Remove event listeners
    this._video = video
    this._storeDispatch.video.videoFound()
  }

  _updateVideoIfNeeded() {
    const newVideo = this._findVideo()
    if (newVideo !== undefined) {
      if (newVideo !== this._video) {
        this._setVideo(newVideo)
      }
    }
  }

  getVideo() {
    this._updateVideoIfNeeded()
    return this._video
  }
}

const vc = new VideoController()

export default vc
