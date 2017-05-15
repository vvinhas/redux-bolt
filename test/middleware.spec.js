import { createBoltMiddleware, joinChannel, leaveChannel } from '../src'
import options from '../src/defaultOptions'
import * as Constants from '../src/constants'

describe('Redux-Bolt Middleware', () => {
  const fakeUrl = 'http://0.0.0.0'
  const boltMiddleware = createBoltMiddleware(fakeUrl)

  it('Should return a function', () => {
    expect(typeof boltMiddleware).toBe('function')
  })
})
