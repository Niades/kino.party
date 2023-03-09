import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { KVThemeProvider } from './themes/KVThemeProvider'
import { store } from './store'
import App from './react/App'
import { AppGlobalStyles } from './styles/global'

export function startReact(rootSelector: string) {
  const rootEl = document.querySelector(rootSelector)
  const root = ReactDOM.createRoot(rootEl as HTMLElement)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <KVThemeProvider>
          <AppGlobalStyles />
          <App />
        </KVThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}
