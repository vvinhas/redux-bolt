import io from 'socket.io-client'
import * as Constants from './constants'
import defaultOptions from './defaultOptions'

/**
 * Creates the middleware and sets the listener
 * 
 * @param url Host URL to SocketIO Server
 * @param userOptions Object to override default options
 * @return Store
 */
const createBoltMiddleware = (url, userOptions = {}) => {
  // Update options
  const options = {
    ...defaultOptions,
    ...userOptions,
    socketUrl: url
  }
  // Creates the socket
  const socket = io(options.socketUrl, options.socketOptions)

  return store => {
    // We'll need to dispatch response actions 
    // when receiving actions from the server
    const { dispatch } = store
    const { propName } = options
    // Emits a redux action with the Socket ID 
    // that can be captured by the user
    socket.on('connect', () => dispatch({
      type: Constants.actions.connect,
      socketId: socket.id
    }))
    // Adds a listener to observe every Bolt event
    socket.on(Constants.actions.wide, action => dispatch({
      ...action,
      [propName]: {
        ...action[propName],
        type: Constants.events.receive
      }
    }))
    // Bolt Middleware
    return next => action => {
      // If it's an action to join or leave a channel
      if (action.type === Constants.actions.joinChannel
          || action.type === Constants.actions.leaveChannel) {
        socket.emit(action.type, action)
        return next(action)
      }

      const { propName } = options
      // If theres a Bolt prop
      if (action[propName]) {
        // If the action is a response, we're not interested
        // Simply let redux do it's job
        if (action[propName].type === Constants.events.receive) {
          return next(action)
        }
        // Transforms the action into a object readable by Bolt
        const boltAction = {
          ...action,
          [propName]: {
            ...action[propName],
            type: options.actionType.send
          }
        }
        // Emits the event to a channel or system wide
        const actionType = typeof boltAction[propName].channel === 'string' ? 'channel' : 'wide'
        socket.emit(Constants.actions[actionType], boltAction)
        // Returns the Bolt transformed action
        return next(boltAction)
      }

      return next(action)
    }
  }
}

export default createBoltMiddleware
