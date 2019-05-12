import { events } from '../constants'

/**
 * Handler responsible for dispatching an error
 * whenever there's a socket error
 */
export default {
  event: 'error',
  handler: ({ dispatch }) => error =>
    dispatch({
      type: events.error,
      error
    })
}
