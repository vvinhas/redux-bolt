import { events } from '../constants'
import reconnectHandler from './reconnectHandler'

describe('[Handler] reconnect', () => {
  it('Must handle the `reconnect` event', () => {
    expect(reconnectHandler.event).toBe('reconnect')
  })

  it('Must dispatch an action containing a reconnection event', () => {
    const mockedBoltObject = {
      dispatch: jest.fn(),
      queue: { release: jest.fn() },
      socket: { emit: () => null }
    }

    reconnectHandler.handler(mockedBoltObject)()

    expect(mockedBoltObject.dispatch.mock.calls.length).toBe(1)
    expect(mockedBoltObject.dispatch.mock.calls[0][0]).toEqual({
      type: events.reconnected
    })
    expect(mockedBoltObject.queue.release.mock.calls.length).toBe(1)
  })
})
