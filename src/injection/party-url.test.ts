import { encodePayload, decodePayload, generateHostPartyUrl } from './party-url'
import { expect, test } from '@jest/globals'

test('encodes object to string', () => {
  expect(encodePayload({ a: '1', b: '2', c: '3' })).toBe('YT0xJmI9MiZjPTM')
})

test('decodes object from string', () => {
  expect(decodePayload('YT0xJmI9MiZjPTM')).toStrictEqual({
    a: '1',
    b: '2',
    c: '3',
  })
})

test('generates party url for host', () => {
  expect(generateHostPartyUrl('123')).toBe(
    'http://kino.party/join/?partyData=cGVlcklkPTEyMyZwYXJ0eVVybD1odHRwOi8vbG9jYWxob3N0Lw'
  )
})
