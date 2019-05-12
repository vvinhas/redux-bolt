import { events } from '../constants'
import * as Messages from '../messages'

export const triggerHandler = options => dispatch => action => {
  const { trigger } = action.bolt

  try {
    // Checks whether the object returned contains an
    // array of listeners to call
    if (!Array.isArray(trigger) || trigger.length <= 0) {
      throw Messages.errors.triggerObjectMalformed
    }

    trigger.map(listenerObj => {
      const { listener, args } = listenerObj
      // If there's no listener, throws an error
      if (!listener) {
        throw Messages.errors.triggerObjectMalformed
      }

      if (options.listeners.hasOwnProperty(listener)) {
        dispatch(options.listeners[listener](...args))
      }
    })
  } catch (e) {
    console.error(e)
  }
}

export default {
  event: events.trigger,
  handler: triggerHandler
}
