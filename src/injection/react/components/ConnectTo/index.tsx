import React, { useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'

interface ConnectToProps {
  onConnectRequest: (peerId: string) => void
}

function ConnectTo(props: ConnectToProps) {
  const [peerId, setPeerId] = useState<string>('')
  return (
    <div>
      <h4>Подключение к вечеринке</h4>
      <Input
        placeholder="Код вечеринки"
        value={peerId}
        onChange={(value) => setPeerId(value)}
      />
      <Button
        text="Подключиться"
        onClick={() => props.onConnectRequest(peerId)}
      />
    </div>
  )
}

export { ConnectTo }
