import QueueManager from './tools/queueManager'

/**
 * Default options
 *
 * @const {object}
 */
export default {
  socketOptions: {},
  propName: 'bolt',
  queueManager: new QueueManager(),
  queueInterval: 1000,
  actionsMap: {},
  listeners: {},
  handlers: []
}
