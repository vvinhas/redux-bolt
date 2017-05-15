import * as Constants from './constants'

const leaveChannel = channel => ({
  type: Constants.types.send,
  event: Constants.events.leaveChannel,
  channel
})

export default leaveChannel
