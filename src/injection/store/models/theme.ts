import { createModel } from '@rematch/core'
import type { RootModel } from './RootModel'

type ThemeState = {
  themeIdx: number
}

const DEFAULT_THEME_IDX = 0

export const theme = createModel<RootModel>()({
  state: {
    themeIdx: DEFAULT_THEME_IDX,
  } as ThemeState,
  reducers: {
    setThemeIdx(state, newIdx: number) {
      state.themeIdx = newIdx
    },
  },
})
