import dispatcher from './dispatcher'
import * as Constants from '../constants'

describe('[Tool] Dispatcher', () => {
  const socket = {
    emit: jest.fn()
  }

  it('Should return a funtion', () => {
    expect(typeof dispatcher(socket)).toBe('function')
  })

  it('Returns true whenever is called', () => {
    const action = { type: 'BOLT_ACTION' }
    expect(dispatcher(socket)(action)).toBe(true)
  })

  it('Should emit the Bolt action to the socket', () => {
    const action = {
      type: 'BOLT_ACTION',
      bolt: {
        type: Constants.types.send,
        event: Constants.events.message
      }
    }
    dispatcher(socket)(action)
    expect(socket.emit).toBeCalledWith(action.bolt.event, action)
  })
})
