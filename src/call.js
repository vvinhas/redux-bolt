import * as Constants from './constants'

/**
 * Creates an action informing bolt to call
 * an action creator mapped in the options
 *
 * @param {string} actionName Name of the action creator function
 * @param {*} args Arguments used by the action creator
 */
const call = (actionName, ...args) => ({
  type: Constants.types.send,
  event: Constants.events.call,
  call: [actionName, args]
})

export default call
