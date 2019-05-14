import { types, events } from '../constants'
import messageHandler from './messageHandler'

describe('[Handler] message', () => {
  const mockOptions = {
    propName: 'socket'
  }
  const mockAction = {
    type: 'MESSAGE_ACTION',
    socket: {
      type: types.send,
      message: 'New Message!'
    }
  }

  it('Should handle the `message` event', () => {
    expect(messageHandler.event).toBe(events.message)
  })

  it('Should transform the action to a Bolt/Receive type', () => {
    const mockDispatch = jest.fn()

    messageHandler.handler({
      dispatch: mockDispatch,
      options: mockOptions
    })(mockAction)

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      ...mockAction,
      [mockOptions.propName]: {
        ...mockAction[mockOptions.propName],
        type: types.receive
      }
    })
  })
})
