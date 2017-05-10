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
  event: {
    connect: 'bolt_connect',
    action: 'bolt_action',
    joinRoom: 'bolt_join_room',
    leaveRoom: 'bolt_leave_room',
    disconnect: 'bolt_disconnect',
  },
  actionType: {
    send: 'bolt_action_send',
    receive: 'bolt_action_receive',
  }
}
