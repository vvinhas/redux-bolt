import * as Constants from '../constants'
import getBoltObject from '../getBoltObject'

/**
 * Checks if the action is beign sended to the server
 *
 * @param {object} action Redux action
 * @return {bool}
 */
export default action => {
  const boltObject = getBoltObject(action)

  if (boltObject) {
    return boltObject.type === Constants.types.send
  }

  return false
}
