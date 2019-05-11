import io from 'socket.io-client'
import { types, events } from './constants'
import defaultOptions from './defaultOptions'
import getBoltObject from './getBoltObject'
import QueueManager from './queueManager'
import message from './message'
import * as Messages from './messages'
import boltHandlers from './handlers'

/**
 * Creates the middleware and sets the listener
 *
 * @param {string} url URL to SocketIO Server
 * @param {object} userOptions Object to override default options
 * @return {function} A Redux middleware function
 */
const createBoltMiddleware = (url, userOptions = {}) => {
  // Update options
  const options = {
    ...defaultOptions,
    ...userOptions
  }

  // Creates the socket
  const socket = io(url, options.socketOptions)

  return store => {
    // We'll need to dispatch response actions
    // when receiving actions from the server
    const { dispatch } = store
    const { propName } = options
    // Store actions in the queue
    // When there's no connection estabilished
    // And release them once a connection is made
    const queue = new QueueManager()
    // The emmiter function
    const send = action => {
      const boltObject = getBoltObject(action)
      if (boltObject) {
        socket.emit(boltObject.event, action)
      }
      return true
    }
    // Registering common connection listeners
    // Here we basically dispatch normal actions
    // to inform the developer when some event
    // happend on the client side
    socket.on('connect', () => {
      dispatch({ type: events.connected })
    })

    socket.on('reconnect', () => {
      queue.release(send)
      dispatch({ type: events.reconnected })
    })

    socket.on('disconnect', () => {
      dispatch({ type: events.disconnected })
    })

    socket.on('connect_error', error => {
      dispatch({ type: events.error, error })
    })

    socket.on('error', error => {
      dispatch({ type: events.error, error })
    })

    // Register the listener responsible
    // for catching every Bolt event
    socket.on(events.message, action =>
      dispatch({
        ...action,
        [propName]: {
          ...action[propName],
          type: types.receive
        }
      })
    )

    socket.on(events.broadcast, broadcast => {
      const [action, args] = broadcast
      if (options.listeners.hasOwnProperty(action)) {
        dispatch(options.listeners[action](...args))
      }
    })

    socket.on(events.call, call => {
      const [action, args] = call
      if (options.actionsMap.hasOwnProperty(action)) {
        dispatch(options.actionsMap[action](...args))
      }
    })

    const socketHandlers = [...options.handlers, ...boltHandlers]
    // Registering user and default SocketIO handlers
    socketHandlers.map(({ event, handler }) => {
      if (!event || !handler) {
        throw new Exception(Messages.errors.invalidHandler)
      }
      // Register the event handler
      socket.on(event, handler(options)(dispatch))
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
      queue.release(send)

      return next(action)
    }
  }
}

export default createBoltMiddleware
