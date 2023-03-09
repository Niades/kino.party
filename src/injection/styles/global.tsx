import React from 'react'
import '../themes/types'
import { Global, css, useTheme } from '@emotion/react'

function AppGlobalStyles() {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

        #kp-ui-react {
          font-family: ${theme.global.fontFamily};
          font-size: 14px;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          min-width: 300px;
          color: ${theme.global.textColor};
          z-index: 9999;
        }

        #kp-ui-react h2 {
          display: block;
          font-size: 1.5em;
          margin-block-start: 0.83em;
          margin-block-end: 0.83em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          font-weight: bold;
        }

        #kp-ui-react input {
          font-size: 13.333px !important;
        }
      `}
    />
  )
}

export { AppGlobalStyles }
