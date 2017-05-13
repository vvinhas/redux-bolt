import { isReceiving, isSending } from '../src'
import options from '../src/defaultOptions'
import * as Constants from '../src/constants'

describe('Redux-Bolt Helpers', () => {
  it('Should detect if the action is being sent to the server', () => {
    const action = {
      [options.propName]: {
        type: Constants.events.send
      }
    }

    expect(isSending(action)).toBe(true)
    expect(isReceiving(action)).toBe(false)
  })

  it('Should detect if the action is being received from the server', () => {
    const action = {
      [options.propName]: {
        type: Constants.events.receive
      }
    }

    expect(isReceiving(action)).toBe(true)
    expect(isSending(action)).toBe(false)
  })
})
