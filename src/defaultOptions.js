/**
 * Default options
 * 
 * @type object
 */
export default {
  socketUrl: 'http://localhost',
  socketOptions: {},
  propName: 'socket',
  clientInfo: {},
  currentChannel: null,
  event: {
    connect: 'bolt_connect',
    action: 'bolt_action',
    channel: 'bolt_channel_action',
    joinChannel: 'bolt_join_channel',
    leaveChannel: 'bolt_leave_channel',
    disconnect: 'bolt_disconnect',
  },
  actionType: {
    send: 'send',
    receive: 'receive',
  }
}
