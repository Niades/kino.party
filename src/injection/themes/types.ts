import '@emotion/react'
import type { AppTheme } from './defaultTheme'

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
