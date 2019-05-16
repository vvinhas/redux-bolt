import * as Constants from '../constants'

/**
 * Extract the Bolt Object from the Redux Action
 *
 * @param {object} action Redux Action
 * @return {object|undefined} Bolt Object
 */
const getBoltObject = action => {
  const key = Object.keys(action).find(prop => {
    if (
      action[prop] instanceof Object &&
      action[prop].hasOwnProperty('type')
    ) {
      return Object.values(Constants.types).includes(action[prop].type)
    }

    return false
  })

  return action[key]
}

export default getBoltObject
