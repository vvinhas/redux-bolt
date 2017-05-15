import * as Constants from './constants'

const joinChannel = channel => ({
  type: Constants.types.send,
  event: Constants.events.joinChannel,
  channel
})

export default joinChannel
