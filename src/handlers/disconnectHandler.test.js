import { events } from '../constants'
import disconnectHandler from './disconnectHandler'

describe('[Handler] disconnect', () => {
  it('Must handle the `disconnect` event', () => {
    expect(disconnectHandler.event).toBe('disconnect')
  })

  it('Must dispatch an action containing a disconnection event', () => {
    const mockDispatch = jest.fn()

    disconnectHandler.handler({ dispatch: mockDispatch })()

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: events.disconnected
    })
  })
})
