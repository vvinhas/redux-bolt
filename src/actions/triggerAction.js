import * as Constants from '../constants'

/**
 * Trigger an event informing bolt to call
 * all registered listeners mapped
 *
 * @param {string|Array} listener Name of the event listener or an Array
 * containing info about the listeners to be called
 * @param {*} args Arguments used by the event listener
 */
export default (listener, ...args) => ({
  type: Constants.types.send,
  event: Constants.events.trigger,
  trigger: Array.isArray(listener) ? listener : [{ listener, args }]
})
