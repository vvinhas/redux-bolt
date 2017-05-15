/**
 * Represents the available types of a Bolt Object
 * @const {object}
 */

export const types = {
  send: 'Bolt/Send',
  receive: 'Bolt/Receive'
}

/**
 * Represents the available events of a Bolt Object
 * @const {object}
 */
export const events = {
  connect: 'Bolt/Connect',
  message: 'Bolt/Message',
  channelMessage: 'Bolt/Channel_Message',
  joinChannel: 'Bolt/Join_Channel',
  leaveChannel: 'Bolt/Leave_Channel'
}
