/**
 * Emits an event informing the server to let 
 * the socket join a determined room/channel
 * 
 * @param channel string Name of the channel
 * @return bool
 */
const joinChannel = channel => {
  socket.emit(options.event.joinChannel, channel)
  return true
}

export default joinChannel
