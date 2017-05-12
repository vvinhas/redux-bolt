import * as Constants from './constants'

/**
 * Emits an event informing the server to let 
 * the socket leave a determined room/channel
 * 
 * @param channel string Name of the channel
 * @return bool
 */
const leaveChannel = channel => ({
  type: Constants.actions.leaveChannel,
  channel
})

export default leaveChannel
