import React, { ReactNode } from 'react'
import styled from '@emotion/styled'

interface InputProps {
  id?: string
  onChange?: (value: string) => void
  onEnterPress?: () => void
  value: string
  placeholder?: string
  readOnly?: boolean
  button?: ReactNode
}

const InputContainer = styled.div`
  position: relative;
`

const InlineButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  > button {
    height: 27.5px;
    padding: 0 5px;
  }
`

const Inpt = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ececec;
  outline: none;
`

function Input(props: InputProps) {
  const { id, value, onChange, onEnterPress, placeholder, readOnly, button } =
    props
  const input = (
    <Inpt
      id={id}
      placeholder={placeholder}
      readOnly={readOnly}
      type="text"
      value={value}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Enter') {
          if (onEnterPress !== undefined) {
            onEnterPress()
          }
        }
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  )
  if (button === undefined) {
    return <InputContainer>{input}</InputContainer>
  } else {
    return (
      <InputContainer>
        {input}
        <InlineButtonContainer>{button}</InlineButtonContainer>
      </InputContainer>
    )
  }
}

export { Input }
