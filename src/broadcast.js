import * as Constants from './constants'

/**
 * Creates an action informing bolt to call
 * an action creator
 *
 * @param {string} actionName Name of the action creator function
 * @param {*} args Arguments used by the action creator
 */

const defaultOptions = {
  toSelf: false,
  propName: 'bolt'
}

const broadcast = (action, args = [], options = {}) => {
  const settings = {
    ...defaultOptions,
    ...options
  }

  return {
    type: Constants.events.broadcast,
    broadcast: [action, args],
    toSelf: settings.toSelf,
    [settings.propName]: {
      type: Constants.types.send,
      event: Constants.events.broadcast
    }
  }
}

export default broadcast
