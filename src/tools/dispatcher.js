import getBoltObject from './getBoltObject'

/**
 * The dispatcher of actions beign held in the Queue Manager
 *
 * @param {object} socket The socket instance
 * @return {function} The function responsible to handle each action
 * beign released from the Queue
 */
export default socket => action => {
  const boltObject = getBoltObject(action)
  if (boltObject) {
    socket.emit(boltObject.event, action)
  }
  return true
}
