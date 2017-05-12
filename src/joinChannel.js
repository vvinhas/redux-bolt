import * as Constants from './constants'

/**
 * Emits an action informing redux to let 
 * the socket join a determined room/channel
 * 
 * @param channel string Name of the channel
 * @return bool
 */
const joinChannel = channel => ({
  type: Constants.actions.joinChannel,
  channel
})

export default joinChannel
