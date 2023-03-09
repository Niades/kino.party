import React from 'react'
import styled from '@emotion/styled'

interface LEDProps {
  ok: boolean
  label: string
}

const Container = styled.div`
  border: 1px solid #d1d6db;
  border-radius: 9px;
  display: inline-block;
  padding: 15px 5px;
  width: 40px;
  height: 50px;
  text-align: center;
`

const Diode = styled.div`
  margin: 15px auto;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  box-shadow: ${(props) => props.color} 0 0 25px 10px;
`

const Label = styled.div`
  text-align: center;
  text-transform: uppercase;
`

const OK_COLOR = 'lightgreen'
const NOT_OK_COLOR = 'red'

function LED(props: LEDProps) {
  const { ok, label } = props
  const color = ok ? OK_COLOR : NOT_OK_COLOR
  return (
    <Container>
      <Diode color={color} />
      <Label>{label}</Label>
    </Container>
  )
}

export { LED }
