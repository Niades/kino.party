import React from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import styled from '@emotion/styled'
import { Logo68 } from '../Logo'

interface MinimizedPanelProps {
  onClick: () => void
}

const PanelContainer = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  cursor: pointer;
  background-color: ${props => props.theme.colors.windowBodyBg};
  width: 30px;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  padding: 10px 3px;
  opacity: 0.15;

  &:hover {
    opacity: 1;
  }
`

function MinimizedPanel(props: MinimizedPanelProps) {
  const { onClick } = props
  return (
    <PanelContainer onClick={onClick}>
      <Logo68 />
      <ChevronLeftIcon />
    </PanelContainer>
  )
}

export {
  MinimizedPanel
}