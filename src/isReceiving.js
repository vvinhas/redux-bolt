import * as Constants from './constants'
import getBoltObject from './getBoltObject'

/**
 * Checks if the action is beign received from the server
 * 
 * @param action Redux action
 * @return bool
 */
const isReceiving = action => {
  const boltObject = getBoltObject(action)
  
  if (boltObject) {
    return boltObject.type === Constants.types.receive
  }

  return false
}

export default isReceiving
