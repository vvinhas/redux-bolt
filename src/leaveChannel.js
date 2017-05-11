/**
 * Emits an event informing the server to let 
 * the socket leave a determined room/channel
 * 
 * @param channel string Name of the channel
 * @return bool
 */
const leaveChannel = channel => {
  socket.emit(options.event.leaveChannel, channel)
  return true
}

export default leaveChannel
