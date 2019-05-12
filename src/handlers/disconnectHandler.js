import { events } from '../constants'

/**
 * Handler responsible for dispatching an action
 * whenever the socket disconnects
 */
export default {
  event: 'disconnect',
  handler: ({ dispatch }) => action =>
    dispatch({
      type: events.disconnected
    })
}
