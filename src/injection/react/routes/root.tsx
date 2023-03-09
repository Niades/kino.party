import React from 'react'
import { createMemoryRouter } from 'react-router-dom'
import { ConnectToHost } from './ConnectToHost'
import { Dashboard } from '../routes/Dashboard'
import { Start } from '../routes/Start'

export const router = createMemoryRouter(
  [
    {
      path: '/connect',
      element: <ConnectToHost />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/start',
      element: <Start />,
    },
  ],
  {
    initialEntries: ['/start'],
  }
)
