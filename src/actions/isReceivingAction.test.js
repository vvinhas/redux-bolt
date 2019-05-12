import * as Constants from '../constants'
import isReceiving from './isReceivingAction'

describe('[Action] isReceiving', () => {
  it("Returns false if there's no Bolt object", () => {
    const action = { type: 'SIMPLE_ACTION' }
    expect(isReceiving(action)).toBe(false)
  })

  it("Returns true if there's a Bolt object of type Receive", () => {
    const action = {
      type: 'SIMPLE_ACTION',
      bolt: {
        type: Constants.types.receive,
        event: Constants.events.message
      }
    }
    expect(isReceiving(action)).toBe(true)
  })
})
