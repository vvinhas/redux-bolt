import * as Constants from './constants'

const getBoltObject = action => {
  return action[Object
    .keys(action)
    .find(prop => {
      if (action[prop] instanceof Object
          && action[prop].hasOwnProperty('type')) {
        return (
          action[prop].type === Constants.types.send || 
          action[prop].type === Constants.types.receive
        )
      }
      
      return false
    })]
}

export default getBoltObject
