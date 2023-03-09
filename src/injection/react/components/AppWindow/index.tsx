import React from 'react'
import styled from '@emotion/styled'
import { MinusIcon, XMarkIcon} from '@heroicons/react/24/solid'

interface WindowHeaderProps {
  onMinimize: () => void
}

interface AppWindowProps {
  onMinimize: () => void
  children: React.ReactNode[] | React.ReactNode
}

const WindowContainer = styled.div((props) => {
  const { theme } = props
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderTopLeftRadius: '9px',
    borderBottomLeftRadius: '9px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    backgroundColor: theme.colors.windowBodyBg,
    padding: '50px 10px 10px',
  }
})

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-left: 5px;
  border-bottom: 1px solid #ececec;
  background-color: ${(props) => props.theme.colors.windowHeaderBg};
`

interface HeaderIconProps {
  color: string
}

const HeaderIcon = styled.div<HeaderIconProps>((props) => {
  const { color } = props
  return {
    cursor: 'pointer',
    display: 'inline-block',
    backgroundColor: color,
    width: '15px',
    height: '15px',
    borderRadius: '7.5px',
    margin: '10px 4px',
  }
})

const WindowHeader = function(props: WindowHeaderProps) {
  const { onMinimize } = props
  return (
    <HeaderContainer>
      <HeaderIcon
        onClick={onMinimize}
        color="#fa9c00"
      >
        <MinusIcon />
      </HeaderIcon>
    </HeaderContainer>
  )
}

function AppWindow(props: AppWindowProps) {
  const { onMinimize, children } = props
  return (
    <WindowContainer>
      <WindowHeader
        onMinimize={onMinimize}
      />
      {children}
    </WindowContainer>
  )
}

export { AppWindow }
