import io, { Socket } from 'socket.io-client'
import defaultOptions from './defaultOptions'

/**
 * Client Socket instance
 * 
 * @type Socket
 */
// let socket

/**
 * Global options
 * @type object
 */
let options = defaultOptions

/**
 * Default Socket Payload options
 * 
 * @type object 
 */
const defaultSocketPayload = {
  type: options.actionType.send,
  event: options.event.action,
}

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
    // Creates the socket
    const socket = io(options.socketUrl, options.socketOptions)
    socket.emit(options.event.connect, options)
    // Adds a listener to observe every Bolt event
    const listener = socket.on(options.event.action, action => dispatch({
      ...action,
      [options.propName]: {
        type: options.type.receive
      }
    }))
    // If listener wasn't created properly, throw an error
    if (!(listener instanceof Socket)) {
      throw new Error(`The listener couldn't be created. Check the middleware configuration settings.`)
    }
    
    // Bolt Middleware
    return next => action => {
      const { propName } = options

      if (action[propName]) {
        // If prop is strictly set to true
        // transform it into a object readable by Bolt
        if (action[propName] === true) {
          action = {
            ...action,
            [propName]: defaultSocketPayload
          }
        }
        
        // Checks for aditional events
        for (let eventName of Object.keys(options.events)) {
          if (action[propName][eventName]) {
            socket.emit(options.event[eventName], action[propName][eventName])
          }
        }

        // Emits the event
        socket.emit(action[propName].event, action)
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
