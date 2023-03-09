import React, { useMemo } from 'react'
import useClipboard from 'react-use-clipboard'
import { Button } from '../Button'
import styled from '@emotion/styled'
import { generateHostPartyUrl } from '../../../party-url'

interface YourIDProps {
  id: string
}

const Title = styled.h4`
  margin: 0 0 5px;
`
function YourID(props: YourIDProps) {
  const { id } = props
  const partyUrl = useMemo(() => generateHostPartyUrl(id), [id])
  const [_, copy] = useClipboard(partyUrl)
  return (
    <div>
      <Button text="Копировать ссылку на вечеринку" onClick={copy} />
    </div>
  )
}

export { YourID }
