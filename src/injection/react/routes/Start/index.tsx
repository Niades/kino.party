import React from 'react'
import styled from '@emotion/styled'
import { Button } from '../../components/Button'
import { Logo80 } from '../../components/Logo'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Dispatch } from '../../../store'
import { ChatMode } from '../../../store/models/chat'
import { useEffect } from 'react';
import { decodePayload } from '../../../party-url'
import { createLogger } from '../../../log'

const log = createLogger('Start')

const ButtonsBar = styled.div`
  > button {
    margin-bottom: 10px;
  }
`

const LogoContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 20px;
  min-height: 130px;
  align-items: center;
  justify-content: center;

  > svg {
    position: absolute;
    left: 19px;
    top: -10px;
  }

  > h2 {
    position: relative;
  }
`

function Start() {
  const dispatch = useDispatch<Dispatch>()
  const navigate = useNavigate()
  useEffect(() => {
    try {
      if(window.location.search.length > 0) {
        const params = new Proxy(new URLSearchParams(window.location.search), {
          get: (searchParams, prop) => searchParams.get(prop as string),
        });
        if(params['partyData'] !== undefined) {
          const pl = decodePayload(params['partyData']) as { peerId: string }
          dispatch.chat.selectMode(ChatMode.CLIENT)
          dispatch.peer.connectTo(pl.peerId)
          navigate('/dashboard')
          log('partyData parsed, connecting')
        }
      }
    } catch {
      log('ERR: failed to decode partyData')
    }
  }, [])
  return (
    <div>
      <LogoContainer>
        <Logo80 />
        <h2>КиноВечеринка</h2>
      </LogoContainer>
      <ButtonsBar>
        <Button
          id="kv-create-party"
          text="Начать вечеринку"
          onClick={() => {
            dispatch.chat.selectMode(ChatMode.HOST)
            navigate('/dashboard')
          }}
        />
        <p>
          После создания вечеринки, поделись ссылкой со своими друзьями
        </p>
        <p>
          Если ты хочешь присоединиться к вечеринке, перейди по ссылке на вечеринку и нажми на иконку расширения ещё раз
        </p>
      </ButtonsBar>
    </div>
  )
}

export { Start }
