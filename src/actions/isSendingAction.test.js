import * as Constants from '../constants'
import isSending from './isSendingAction'

describe('[Action] isSending', () => {
  it("Returns false if there's no Bolt object", () => {
    const action = { type: 'SIMPLE_ACTION' }
    expect(isSending(action)).toBe(false)
  })

  it("Returns true if there's a Bolt object of type Send", () => {
    const action = {
      type: 'SIMPLE_ACTION',
      bolt: {
        type: Constants.types.send,
        event: Constants.events.message
      }
    }
    expect(isSending(action)).toBe(true)
  })
})
