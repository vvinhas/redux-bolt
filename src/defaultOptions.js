import QueueManager from './tools/queueManager'

/**
 * Default options
 *
 * @const {object}
 */
export default {
  propName: 'bolt',
  queueManager: new QueueManager(),
  queueInterval: 1000,
  listeners: {},
  handlers: []
}
