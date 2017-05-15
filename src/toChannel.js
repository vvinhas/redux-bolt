import * as Constants from './constants'

/**
 * Informs your server to send this action
 * to a specific channel only
 * 
 * @param {string} channel Name of the channel to message
 * @return {object} Bolt Object
 */
const toChannel = channel => ({
  type: Constants.types.send,
  event: Constants.events.channelMessage,
  channel
})

export default toChannel
