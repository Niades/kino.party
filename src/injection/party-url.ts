import { encode, decode } from 'js-base64'

interface PartyPayload {
  peerId: string
  partyUrl: string
}

function encodePayload(payload: object): string {
  return encode(
    JSON.stringify(payload),
    true
  )
}

function decodePayload(encoded: string): object {
  return JSON.parse(decode(encoded))
}

function generateHostPartyUrl(peerId: string): string {
  const partyUrl = window.location.href
  return `https://kino.party/join/?partyData=${encodePayload({
    peerId,
    partyUrl,
  })}`
}

export { encodePayload, decodePayload, generateHostPartyUrl }
