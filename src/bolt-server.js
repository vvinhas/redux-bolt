const events = {
  connect: 'bolt_connect',
  action: 'bolt_action',
  channel: 'bolt_channel_action',
  joinChannel: 'bolt_join_channel',
  leaveChannel: 'bolt_leave_channel',
  disconnect: 'bolt_disconnect'
}

exports.socketCallback = socket => {
  socket.on(events.action, action => {
    console.log('Bolt Action', action)
    socket.broadcast.emit('bolt_action', action)
  })

  socket.on(events.joinChannel, channel => {
    console.log('Bolt Join Channel', channel)
    socket.join(channel)
  })

  socket.on(events.leaveChannel, channel => {
    console.log('Bolt Leave Channel', channel)
    socket.leave(channel)
  })

  socket.on(events.channel, action => {
    console.log('Bolt Channel Action', action.channel, action)
    socket.broadcast
          .to(action.channel)
          .emit('bolt_action', action)
  })
}