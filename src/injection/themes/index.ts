import './types'
import type { AppTheme } from './defaultTheme'
import { defaultTheme } from './defaultTheme'

const themes = [defaultTheme]

function getThemeByIndex(idx: number): AppTheme {
  return themes[idx]
}

export { getThemeByIndex }
