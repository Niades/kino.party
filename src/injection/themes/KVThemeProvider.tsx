import React, { ReactNode } from 'react'
import { ThemeProvider } from '@emotion/react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { getThemeByIndex } from './index'

interface KVThemeProviderProps {
  children: ReactNode
}

function KVThemeProvider(props: KVThemeProviderProps) {
  const themeIdx = useSelector<RootState, number>(
    (state) => state.theme.themeIdx
  )
  const theme = useMemo(() => getThemeByIndex(themeIdx), [themeIdx])
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

export { KVThemeProvider }
