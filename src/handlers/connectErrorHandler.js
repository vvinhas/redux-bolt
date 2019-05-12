import { events } from '../constants'

/**
 * Handler responsible for dispatching an error
 * whenever there's a socket connection error
 */
export default {
  event: 'connect_error',
  handler: ({ dispatch }) => error =>
    dispatch({
      type: events.error,
      error
    })
}
