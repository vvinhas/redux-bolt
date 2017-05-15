import io from 'socket.io-client'
import { types, events } from './constants'
import defaultOptions from './defaultOptions'
import getBoltObject from './getBoltObject'

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
    ...userOptions
  }
  let connected = false
  let error = false
  let queuedActions = []
  // Creates the socket
  const socket = io(url, options.socketOptions)
  // Function responsible for dispatching
  // events to the server
  const send = action => {
    const boltObject = getBoltObject(action)
    console.log('Dispatching Queued:', boltObject)
    if (boltObject) {
      socket.emit(boltObject.event, action)
    }
    return action
  }

  return store => {
    // We'll need to dispatch response actions 
    // when receiving actions from the server
    const { dispatch } = store
    const { propName } = options
    // Register a connection listener
    socket.on('connect', () => connected = true)
    socket.on('connect_error', connError => error = connError)
    // Register the listener responsible for catching every Bolt event
    socket.on(events.message, action => dispatch({
      ...action,
      [propName]: {
        ...action[propName],
        type: types.receive
      }
    }))
    // Check for queued actions and dispatch'em socket is connected
    // Or cancel the queue if there's an error
    let queueCheck = setInterval(() => {
      // If it's connected and there are queued actions, dispatch'em
      if (connected) {
        if (queuedActions.length > 0) {
          queuedActions.forEach(action => send(action))
          queuedActions = []
        }
        clearInterval(queueCheck)
      }

      // Check for errors
      if (error) {
        clearInterval(queueCheck)
        throw new Error(error)
      }
    }, options.queueInterval)

    return next => action => {
      let boltProp = action[propName]
      switch (typeof boltProp) {
        // If it's a boolean, check to see if it's strictly set to true
        case 'boolean':
          if (boltProp === false) {
            return next(action)
          }
          boltProp = {
            event: events.message,
            type: types.send
          }
          break
        // If it's an object that is not a response
        // overrides the type property
        case 'object':
          if (boltProp.type === types.receive) {
            return next(action)
          }
          const event = boltProp.hasOwnProperty('event') ? boltProp.event : events.message
          boltProp = {
            ...boltProp,
            type: types.send,
            event
          }
          break
        // Anything else is discarted
        default:
          return next(action)
      }

      action = {
        ...action,
        [propName]: {
          ...boltProp
        }
      }

      if (!connected || error) {
        console.log('Queuing Action', action)
        queuedActions.push(action)
        return next(action)
      }

      return next(send(action))
    }
  }
}

export default createBoltMiddleware
