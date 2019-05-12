import message from './messageAction'
import * as Constants from '../constants'

describe('[Action] message', () => {
  it('Returns an object containing a send type and message event', () => {
    expect(message()).toEqual({
      type: Constants.types.send,
      event: Constants.events.message
    })
  })
})
