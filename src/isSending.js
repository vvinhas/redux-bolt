import * as Constants from './constants'

/**
 * Checks if the action is beign sended to the server
 * 
 * @param action Redux action
 * @return bool
 */
const isSending = action => 
  typeof Object.keys(action).find(prop => 
    action[prop].hasOwnProperty('type') ? 
      action[prop].type === Constants.events.send 
      : false
  ) !== 'undefined'

export default isSending
