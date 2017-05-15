import * as Constants from './constants'

/**
 * Informs your server to disconnect the socket from a specific channel
 * 
 * @param {string} channel Name of the channel to leave
 * @return {object} Bolt Object
 */
const leaveChannel = channel => ({
  type: Constants.types.send,
  event: Constants.events.leaveChannel,
  channel
})

export default leaveChannel
