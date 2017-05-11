/**
 * Checks if the action is beign received from the server
 * 
 * @param action Redux action
 * @return bool
 */
const isReceiving = action => action[options.propName].type === options.actionType.receive

export default isReceiving
