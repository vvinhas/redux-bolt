import * as Constants from './constants'
/**
 * Checks if the action is beign received from the server
 * 
 * @param action Redux action
 * @return bool
 */

const isReceiving = action => {
  return Object.keys(action)
    .filter(prop => action[prop].type === Constants.events.receive)
    .length === 1
}

export default isReceiving
