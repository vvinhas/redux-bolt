import { events } from '../constants'
import connectErrorHandler from './connectErrorHandler'

describe('[Handler] connectError', () => {
  it('Must handle the `connect_error` event', () => {
    expect(connectErrorHandler.event).toBe('connect_error')
  })

  it('Must dispatch an action containing an error event and the error message', () => {
    const mockDispatch = jest.fn()
    const mockError = 'An error ocurred!'

    connectErrorHandler.handler({ dispatch: mockDispatch })(mockError)

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: events.error,
      error: mockError
    })
  })
})
