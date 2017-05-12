import * as Constants from './constants'

/**
 * Checks if the action is beign sended to the server
 * 
 * @param action Redux action
 * @return bool
 */
const isSending = action => {
  return Object.keys(action)
    .filter(prop => action[prop].type === Constants.events.send)
    .length === 1
}

export default isSending
