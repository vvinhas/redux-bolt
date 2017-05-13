import { createBoltMiddleware, joinChannel, leaveChannel } from '../src'
import options from '../src/defaultOptions'
import * as Constants from '../src/constants'

describe('Redux-Bolt Middleware', () => {
  const fakeUrl = 'http://0.0.0.0'
  const boltMiddleware = createBoltMiddleware(fakeUrl)

  it('Should return a function', () => {
    expect(typeof boltMiddleware).toBe('function')
  })

  it('Should be able to join a channel', () => {
    const channel = 'test-channel'
    const expected = {
      type: Constants.actions.joinChannel,
      channel
    }
    
    expect(joinChannel(channel)).toEqual(expected)
  })
  
  it('Should be able to leave a channel', () => {
    const channel = 'test-channel'
    const expected = {
      type: Constants.actions.leaveChannel,
      channel
    }

    expect(leaveChannel(channel)).toEqual(expected)
  })
})
