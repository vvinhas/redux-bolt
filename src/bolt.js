import io from 'socket.io-client'
import defaultOptions from './defaultOptions'

/**
 * Client Socket instance
 * 
 * @type Socket
 */
let socket

/**
 * Global options
 * @type object
 */
let options = defaultOptions

/**
 * Creates the middleware and sets the listener
 * 
 * @param url Host URL to SocketIO Server
 * @param userOptions Object to override default options
 * @return Store
 */
export const createBoltMiddleware = (url, userOptions = {}) => {
  // Update global options
  options = {
    ...options,
    ...userOptions,
    socketUrl: url
  }
  // Creates the socket
  socket = io(options.socketUrl, options.socketOptions)

  return store => {
    // We'll need to dispatch response actions 
    // when receiving actions from the server
    const { dispatch } = store
    const { propName } = options
    // Emits a connection event
    socket.emit(options.event.connect, options)
    // Adds a listener to observe every Bolt event
    socket.on(options.event.action, action => dispatch({
      ...action,
      [propName]: {
        ...action[propName],
        type: options.actionType.receive
      }
    }))
    
    // Bolt Middleware
    return next => action => {
      const { propName } = options

      if (action[propName]) {
        // If the action is a response, we're not interested
        // Just let redux do it's job
        if (action[propName].type === options.actionType.receive) {
          return next(action)
        }
        // Transforms the action into a object readable by Bolt
        action = {
          ...action,
          [propName]: {
            ...action[propName],
            type: options.actionType.send
          }
        }
        // Emits the event to a channel or globally
        if (typeof options.currentChannel === 'string') {
          socket.emit(options.event.channel, options.currentChannel, action)
        } else {
          socket.emit(options.event.action, action)
        }
      }

      return next(action)
    }
  }
}

/**
 * Checks if the action is beign received from the server
 * 
 * @param action Redux action
 * @return bool
 */
export const isReceiving = action => action[options.propName].type === options.actionType.receive

/**
 * Checks if the action is beign sended to the server
 * 
 * @param action Redux action
 * @return bool
 */
export const isSending = action => action[options.propName].type === options.actionType.send

/**
 * Emits an event informing the server to let 
 * the socket join a determined room/channel
 * 
 * @param channel string Name of the channel
 * @return bool
 */
export const joinChannel = channel => {
  options = { ...options, currentChannel: channel }
  socket.emit(options.event.joinChannel, channel)
  return true
}

/**
 * Emits an event informing the server to let 
 * the socket leave a determined room/channel
 * 
 * @param channel string Name of the channel
 * @return bool
 */
export const leaveChannel = () => {
  socket.emit(options.event.leaveChannel, options.currentChannel)
  options = { ...options, currentChannel: null }
  return true
}