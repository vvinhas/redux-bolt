import {
  createBoltMiddleware, 
  isReceiving, 
  isSending,
  joinChannel,
  leaveChannel
} from '../src'
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

describe('Redux-Bolt Helpers', () => {
  it('isSending can detect if the action is being sent to the server', () => {
    const action = {
      [options.propName]: {
        type: Constants.events.send
      }
    }

    expect(isSending(action)).toBe(true)
    expect(isReceiving(action)).toBe(false)
  })

  it('isReceiving can detect if the action is being received from the server', () => {
    const action = {
      [options.propName]: {
        type: Constants.events.receive
      }
    }

    expect(isReceiving(action)).toBe(true)
    expect(isSending(action)).toBe(false)
  })
})
