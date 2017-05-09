import {
  createBoltMiddleware, 
  isReceiving, 
  isSending
} from '../src/bolt'

describe('Redux-Bolt Middleware', () => {
  const fakeUrl = 'http://0.0.0.0'
  const boltMiddleware = createBoltMiddleware(fakeUrl)

  it('Should return a function', () => {
    expect(typeof boltMiddleware).toBe('function')
  })
})

describe('Redux-Bolt Helpers', () => {
  it('isSending can detect if the action is being sent to the server', () => {
    const action = {
      type: 'TEST_ACTION',
      socket: {
        type: 'send'
      }
    }

    expect(isSending(action)).toBe(true)
    expect(isReceiving(action)).toBe(false)
  })

  it('isReceiving can detect if the action is being received from the server', () => {
    const action = {
      type: 'TEST_ACTION',
      socket: {
        type: 'receive'
      }
    }

    expect(isReceiving(action)).toBe(true)
    expect(isSending(action)).toBe(false)
  })
})
