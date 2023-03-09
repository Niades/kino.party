import React from 'react'
import { RouterProvider } from 'react-router'
import { AppWindow } from './components/AppWindow'
import { router } from './routes/root'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '../store'
import { MinimizedPanel } from './components/MinimizedPanel'

function App() {
  const dispatch = useDispatch<Dispatch>()
  const [minimized, setMinimized] = useState(false)
  return (
    <>
    {minimized && (
      <MinimizedPanel 
        onClick={() => {
          setMinimized(false)
          dispatch.video.adaptPage()
        }}
      />
    )}
    {!minimized && (
      <AppWindow
        onMinimize={() => {
          setMinimized(true)
          dispatch.video.revertAdaptation()
        }}
      >
        <RouterProvider router={router} />
      </AppWindow>
    )}
    </>
  )
}

export default App
