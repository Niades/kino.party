import KPPeer from './KPPeer'
import VideoController from './VideoController'
import { Dispatch, store } from './store'
import { createLogger } from './log'
import { startReact } from './react'

const log = createLogger('main')

function startRender() {
  const extensionDiv = document.createElement('div')
  extensionDiv.id = 'kp-ui-react'
  const body = document.querySelector('body')
  body.appendChild(extensionDiv)
  startReact('#kp-ui-react')
}

async function main() {
  log('main() running')
  if(window['VECHERINKA_INJECTED'] === undefined) {
    log('no injection found, starting UI')
    window['VECHERINKA_INJECTED'] = true
    const dispatch = store.dispatch as Dispatch
    VideoController.setDispatch(dispatch)
    VideoController.start()
    KPPeer.setDispatch(dispatch)
    dispatch.chat.tryLoadData()
    startRender()
  } else {
    log('injection exists, exitting')
  }
}

main()
