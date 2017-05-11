/**
 * Checks if the action is beign sended to the server
 * 
 * @param action Redux action
 * @return bool
 */
const isSending = action => action[options.propName].type === options.actionType.send

export default isSending
