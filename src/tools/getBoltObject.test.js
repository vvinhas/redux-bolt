import getBoltObject from './getBoltObject'
import * as Constants from '../constants'

describe('[Tool] getBoltObject', () => {
  it("Returns undefined when there's no Bolt object", () => {
    const simpleAction = { type: 'SIMPLE_ACTION' }
    const trickyAction = {
      type: 'TRICKY_ACTION',
      socket: {
        type: 'Unknown Type'
      }
    }
    expect(getBoltObject(simpleAction)).toBe(undefined)
    expect(getBoltObject(trickyAction)).toBe(undefined)
  })

  it('Returns the Bolt object if it contains any known Bolt Type', () => {
    const sendAction = {
      type: 'SENDING',
      bolt: {
        type: Constants.types.send
      }
    }
    const receiveAction = {
      type: 'RECEIVING',
      bolt: {
        type: Constants.types.receive
      }
    }
    expect(getBoltObject(sendAction)).toEqual({
      type: Constants.types.send
    })
    expect(getBoltObject(receiveAction)).toEqual({
      type: Constants.types.receive
    })
  })
})
