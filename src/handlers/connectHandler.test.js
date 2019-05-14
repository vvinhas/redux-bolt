import { events } from '../constants'
import connectHandler from './connectHandler'

describe('[Handler] connect', () => {
  it('Must handle the `connect` event', () => {
    expect(connectHandler.event).toBe('connect')
  })

  it('Must dispatch an action containing a connection event', () => {
    const mockDispatch = jest.fn()

    connectHandler.handler({ dispatch: mockDispatch })()

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: events.connected
    })
  })
})
