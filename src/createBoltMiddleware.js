/**
 * Creates the middleware and sets the listener
 * 
 * @param url Host URL to SocketIO Server
 * @param userOptions Object to override default options
 * @return Store
 */
const createBoltMiddleware = (url, userOptions = {}) => {
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
    // Emits a redux action with the Socket ID
    // Saves the ID in the options
    socket.on('connect', () => {
      dispatch(options.connectAction(socket.id))
      options = { ...options, socketId: socket.id }
    })
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
      // If theres a Bolt prop
      if (action[propName]) {
        // If the action is a response, we're not interested
        // Simply let redux do it's job
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
        if (typeof action[propName].channel === 'string') {
          socket.emit(options.event.channel, action)
        } else {
          socket.emit(options.event.action, action)
        }
      }

      return next(action)
    }
  }
}

export default createBoltMiddleware
