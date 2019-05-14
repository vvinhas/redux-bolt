import { events } from '../constants'
import dispatcher from '../tools/dispatcher'

/**
 * Handler responsible for dispatching an action
 * whenever there's a socket reconnection
 */
export default {
  event: 'reconnect',
  handler: ({ socket, dispatch, options: { queueManager } }) => () => {
    queueManager.release(dispatcher(socket))
    dispatch({
      type: events.reconnected
    })
  }
}
