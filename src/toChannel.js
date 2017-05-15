import * as Constants from './constants'

const toChannel = channel => ({
  type: Constants.types.send,
  event: Constants.events.channelMessage,
  channel
})

export default toChannel
