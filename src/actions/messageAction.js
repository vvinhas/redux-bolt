import * as Constants from '../constants'

/**
 * Creates an action informing bolt to
 * send a message to all connected sockets
 */
export default () => ({
  type: Constants.types.send,
  event: Constants.events.message
})
