import * as Constants from './constants'

/**
 * Checks if the action is beign received from the server
 * 
 * @param action Redux action
 * @return bool
 */
const isReceiving = action => 
  typeof Object.keys(action).find(prop => 
    action[prop].hasOwnProperty('type') ? 
      action[prop].type === Constants.events.receive 
      : false
  ) !== 'undefined'

export default isReceiving
