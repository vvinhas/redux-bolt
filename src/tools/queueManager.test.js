import QueueManager from './queueManager'

describe('Queue Manager', () => {
  const queue = new QueueManager()
  const tasks = [
    { type: 'QUEUE_TEST', text: 'Foo' },
    { type: 'QUEUE_TEST', text: 'Bar' }
  ]

  it('Let you push tasks to the queue', () => {
    tasks.forEach(task => queue.push(task))
    expect(queue.getStack()).toEqual(tasks)
  })

  it('Call a function for each task when releasing the queue', () => {
    const mockFunc = jest.fn(task => false)
    queue.release(mockFunc)
    expect(mockFunc).toHaveBeenCalledTimes(2)
  })

  it('Remove a task from the stack if the function returns true', () => {
    const mockFunc = jest.fn(task => true)
    queue.release(mockFunc)
    expect(queue.getStack()).toEqual([])
  })

  it('Keep the task in the stack if the function returns false', () => {
    tasks.forEach(task => queue.push(task))
    const mockFunc = jest.fn(task => false)
    queue.release(mockFunc)
    expect(queue.getStack()).toEqual(tasks)
  })

  it('Must be able to discard the stack', () => {
    queue.clearStack()
    expect(queue.getStack()).toEqual([])
  })
})
