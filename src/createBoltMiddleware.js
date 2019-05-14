import { types } from './constants'
import defaultOptions from './defaultOptions'
import dispatcher from './tools/dispatcher'
import QueueManager from './tools/queueManager'
import { message } from './actions'
import boltHandlers from './handlers'
import * as Messages from './messages'

/**
 * Creates the middleware and sets the listener
 *
 * @param {string} url URL to SocketIO Server
 * @param {object} userOptions Object to override default options
 * @return {function} A Redux middleware function
 */
const createBoltMiddleware = (socket, userOptions = {}) => {
  // Update options
  const options = {
    ...defaultOptions,
    ...userOptions
  }

  const releaser = dispatcher(socket)
  const queue = new QueueManager()

  return store => {
    // We'll need to dispatch response actions
    // when receiving actions from the server
    const { dispatch } = store
    const { propName } = options

    // Registering user and default SocketIO handlers
    const socketHandlers = [...options.handlers, ...boltHandlers]
    socketHandlers.map(({ event, handler }) => {
      if (!event || !handler) {
        throw new Exception(Messages.errors.invalidHandler)
      }
      // Register the event handler
      socket.on(event, handler({ socket, dispatch, queue, options }))
    })

    return next => action => {
      let boltProp = action[propName]

      switch (typeof boltProp) {
        // If it's a boolean, check to see if it's strictly set to true
        case 'boolean':
          if (boltProp === false) {
            return next(action)
          }
          boltProp = message()
          break
        // If it's an object that is not a response
        // overrides the type property
        case 'object':
          if (boltProp.type === types.receive) {
            return next(action)
          }
          break
        // Anything else is discarted
        default:
          return next(action)
      }
      // Now we override the transformed Bolt Object
      action = {
        ...action,
        [propName]: {
          ...boltProp
        }
      }
      // We push the action to the queue manager
      queue.push(action)
      // If there's no connection, the action stays
      // in the queue but the app keeps working
      if (!socket.connected) {
        return next(action)
      }
      // If there's a connection, we release the stack
      queue.release(releaser)

      return next(action)
    }
  }
}

export default createBoltMiddleware
