import {
  createBoltMiddleware, 
  isReceiving, 
  isSending
} from '../src/bolt'
import options from '../src/defaultOptions'

describe('Redux-Bolt Middleware', () => {
  const fakeUrl = 'http://0.0.0.0'
  const boltMiddleware = createBoltMiddleware(fakeUrl)

  it('Should return a function', () => {
    expect(typeof boltMiddleware).toBe('function')
  })

  it('Should be able to join rooms', () => {
    const action = {
      socket: {
        joinRoom: 'chat-room'
      }
    }
  })
  
  it('Should be able to leave rooms', () => {
    const action = {
      socket: {
        leaveRoom: 'chat-room'
      }
    }
  })
})

describe('Redux-Bolt Helpers', () => {
  it('isSending can detect if the action is being sent to the server', () => {
    const action = {
      [options.propName]: {
        type: options.actionType.send
      }
    }

    expect(isSending(action)).toBe(true)
    expect(isReceiving(action)).toBe(false)
  })

  it('isReceiving can detect if the action is being received from the server', () => {
    const action = {
      [options.propName]: {
        type: options.actionType.receive
      }
    }

    expect(isReceiving(action)).toBe(true)
    expect(isSending(action)).toBe(false)
  })
})
