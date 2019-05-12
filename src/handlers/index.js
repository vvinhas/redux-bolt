import connectErrorHandler from './connectErrorHandler'
import connectHandler from './connectHandler'
import disconnectHandler from './disconnectHandler'
import errorHandler from './errorHandler'
import messageHandler from './messageHandler'
import reconnectHandler from './reconnectHandler'
import triggerHandler from './triggerHandler'

export default [
  connectErrorHandler,
  connectHandler,
  disconnectHandler,
  errorHandler,
  messageHandler,
  reconnectHandler,
  triggerHandler
]
