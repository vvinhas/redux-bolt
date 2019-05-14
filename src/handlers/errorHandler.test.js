import { events } from '../constants'
import errorHandler from './errorHandler'

describe('[Handler] error', () => {
  it('Should handle the `error` event', () => {
    expect(errorHandler.event).toBe('error')
  })

  it('Should dispatch an action containing the error', () => {
    const mockDispatch = jest.fn()

    errorHandler.handler({ dispatch: mockDispatch })('An error ocurred!')

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: events.error,
      error: 'An error ocurred!'
    })
  })
})
