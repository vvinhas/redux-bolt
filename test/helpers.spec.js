import options from '../src/defaultOptions'
import { events, types } from '../src/constants'
import getBoltObject from '../src/getBoltObject'
import {
  isReceiving, 
  isSending, 
  joinChannel, 
  leaveChannel, 
  toChannel 
} from '../src'

describe('Redux-Bolt Helpers', () => {
  it('Detects if the action is being SENT to the server', () => {
    const action = {
      [options.propName]: {
        type: types.send
      }
    }

    expect(isSending(action)).toBe(true)
    expect(isReceiving(action)).toBe(false)
  })

  it('Detects if the action is being RECEIVED from the server', () => {
    const action = {
      [options.propName]: {
        type: types.receive
      }
    }

    expect(isReceiving(action)).toBe(true)
    expect(isSending(action)).toBe(false)
  })

  it('Creates a Bolt Object to JOIN a channel', () => {
    const channel = 'foobar'
    const expected = {
      type: types.send,
      event: events.joinChannel,
      channel
    }

    expect(joinChannel(channel)).toEqual(expected)
  })

  it('Creates a Bolt Object to LEAVE a channel', () => {
    const channel = 'foobar'
    const expected = {
      type: types.send,
      event: events.leaveChannel,
      channel
    }

    expect(leaveChannel(channel)).toEqual(expected)
  })
  
  it('Creates a Bolt Object to MESSAGE a channel', () => {
    const channel = 'foobar'
    const expected = {
      type: types.send,
      event: events.channelMessage,
      channel
    }
    
    expect(toChannel(channel)).toEqual(expected)
  })

  it('Can find a Bolt Object in a Action', () => {
    const action = {
      type: 'FOO_BAR',
      foo: 'bar',
      randomProp: {
        type: types.send,
        event: events.message
      }
    }

    expect(getBoltObject(action)).toBe(action['randomProp'])
  })
})
