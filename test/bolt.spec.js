import {
  createBoltMiddleware, 
  isReceiving, 
  isSending
} from '../src/bolt'

describe('Bolt Middleware', () => {
  const fakeUrl = 'http://0.0.0.0'
  const boltMiddleware = createBoltMiddleware(fakeUrl)

  it('Should return a function', () => {
    expect(typeof boltMiddleware).toBe('function')
  })
})

describe('Bolt Helpers', () => {
  it('Detects if the action is being sent to the server', () => {
    const action = {
      type: 'TEST_ACTION',
      socket: {
        type: 'SEND'
      }
    }

    expect(isReceiving(action)).toBe(false)
    expect(isSending(action)).toBe(true)
  })

  it('Detects if the action is being received from the server', () => {
    const action = {
      type: 'TEST_ACTION',
      socket: {
        type: 'RECEIVE'
      }
    }

    expect(isReceiving(action)).toBe(true)
    expect(isSending(action)).toBe(false)
  })
})
