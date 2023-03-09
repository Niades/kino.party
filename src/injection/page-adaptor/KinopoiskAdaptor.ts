import type { PageAdaptor } from './adaptor'
import { createLogger } from '../log'

const log = createLogger('KinopoiskAdaptor')

class KinopoiskAdaptor implements PageAdaptor {
  adaptPage(): void {
    const pm = document.querySelector(
      '[class^=PlayerManager_player-wrapper]'
    ) as HTMLDivElement | null
    if (pm !== null) {
      pm.style.paddingRight = '300px'
      log('page adapted')
    } else {
      log('WARN: Could not find element to adapt page')
    }
  }

  revertAdaptation(): void {
    const pm = document.querySelector(
      '[class^=PlayerManager_player-wrapper]'
    ) as HTMLDivElement | null
    if (pm !== null) {
      pm.style.paddingRight = '0px'
      log('adaptation reverted')
    } else {
      log('WARN: Could not find element to revert page adaptation')
    }
  }

  isUrlSupported(url: string): boolean {
    return url.match(/hd\.kinopoisk\.ru\/(\?|film)/) !== null
  }
}

export { KinopoiskAdaptor }
