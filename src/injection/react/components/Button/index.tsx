import React from 'react'
import styled from '@emotion/styled'

interface ButtonProps {
  id?: string
  text: string
  onClick?: () => void
}

const Btn = styled.button`
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 700;
  color: ${(props) => props.theme.global.textColor};
  background-color: ${(props) => props.theme.colors.buttonPrimaryBg};
  border-radius: 4px;
  padding: 10px 10px;
  width: 100%;
  height: 49px;
  border: 4px solid transparent;

  &:hover {
    border: 4px solid #ffb1c4;
  }
`

function Button(props: ButtonProps) {
  const { text, onClick, id } = props
  return (
    <Btn id={id} onClick={onClick}>
      {text}
    </Btn>
  )
}

export { Button }
