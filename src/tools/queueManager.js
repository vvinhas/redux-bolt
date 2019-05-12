/**
 * Manage a queue of tasks waiting to be dispatched
 */
export default class QueueManager
{
  /**
   * Constructor
   */
  constructor() {
    this.stack = []
  }

  /**
   * Getter for the stack property
   * @return {array} The queue stack
   */  
  getStack() {
    return this.stack
  }

  /**
   * Clears the stack
   */  
  clearStack() {
    this.stack = []
  }

  /**
   * Pushes the task to the queue stack
   * @param {*} task The task to be stacked
   */  
  push(task) {
    this.stack.push(task)
  }

  /**
   * Runs the array of stacked tasks against
   * the filter function passed
   *
   * @param {function} dispatcher Filter function
   */  
  release(dispatcher) {
    this.stack = this.stack.filter(task => !dispatcher(task))
  }
}
