import io, { Socket } from 'socket.io-client'

/**
 * Default options
 * 
 * @type object
 */
const defaultOptions = {
  socketUrl: 'http://localhost',
  socketOptions: {},
  eventName: 'bolt_action',
  propName: 'socket',
  types: {
    send: 'send',
    receive: 'receive'
  }
}

/**
 * Global options
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
  return store => {
    // We'll need to dispatch response actions when receiving actions from the server
    const { dispatch } = store
    // Update the options
    options = {
      ...defaultOptions,
      ...userOptions,
      socketUrl: url
    }
    console.log(options)
    // Creates the socket
    const socket = io(options.socketUrl, options.socketOptions)
    // Adds a listener to observe every Bolt event
    const listener = socket.on(options.eventName, action => dispatch({
      ...action,
      [options.propName]: {
        type: options.types.receive
      }
    }))
    // If listener wasn't created properly, throw an error
    if (!(listener instanceof Socket)) {
      throw new Error(`The listener couldn't be created. Check middleware configuration settings.`)
    }
    
    // Bolt Middleware
    return next => action => {
      // Checks for socket actions
      if (action[options.propName] === true) {
        // Transform the action
        action = {
          ...action,
          [options.propName]: {
            type: options.types.send
          }
        }
        // Emits the event
        socket.emit(options.eventName, action)
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
export const isReceiving = action => {
  console.log(action[options.propName].type, options.propName)
  return action[options.propName].type === options.types.receive
}

/**
 * Checks if the action is beign sended to the server
 * 
 * @param action Redux action
 * @return bool
 */
export const isSending = action => action[options.propName].type === options.types.send
