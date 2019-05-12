import { events } from '../constants'

/**
 * Handler responsible for dispatching an action
 * whenever there's a socket connection estabilished
 */
export default {
  event: 'connect',
  handler: ({ dispatch }) => action =>
    dispatch({
      type: events.connected
    })
}
