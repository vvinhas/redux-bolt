import { events } from '../constants'
import reconnectHandler from './reconnectHandler'

describe('[Handler] reconnect', () => {
  it('Must handle the `reconnect` event', () => {
    expect(reconnectHandler.event).toBe('reconnect')
  })

  it('Must dispatch an action containing a reconnection event', () => {
    const mockedBoltObject = {
      dispatch: jest.fn(),
      socket: { emit: () => null },
      options: {
        queueManager: { release: jest.fn() }
      }
    }

    reconnectHandler.handler(mockedBoltObject)()

    expect(mockedBoltObject.dispatch.mock.calls.length).toBe(1)
    expect(mockedBoltObject.dispatch.mock.calls[0][0]).toEqual({
      type: events.reconnected
    })
    expect(
      mockedBoltObject.options.queueManager.release.mock.calls.length
    ).toBe(1)
  })
})
