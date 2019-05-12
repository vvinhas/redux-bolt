import { types, events } from '../constants'

/**
 * Handler responsible for dispatching an action
 * to the receiver, whenever a Bolt event
 * is received through the socket
 */
export default {
  event: events.message,
  handler: ({ dispatch, options }) => action => {
    dispatch({
      ...action,
      [options.propName]: {
        ...action[options.propName],
        type: types.receive
      }
    })
  }
}
