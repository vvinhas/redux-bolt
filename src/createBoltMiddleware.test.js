import { types, events } from './constants'
import { errors } from './messages'
import { message, joinChannel } from './actions'
import createBoltMiddleware from './createBoltMiddleware'

const mocks = {
  // WS Mock
  socket: {
    connected: true,
    emit: jest.fn(),
    on: jest.fn()
  },
  // Redux Mock
  store: {
    dispatch: jest.fn()
  },
  next: jest.fn(),
  // Bolt Custom Options
  options: {
    propName: 'socket',
    queueManager: {
      push: jest.fn(),
      release: jest.fn()
    },
    listeners: {
      sayHello: jest.fn()
    },
    handlers: [
      {
        event: 'hello',
        handler: ({ dispatch }) => ({ name }) =>
          dispatch({
            type: 'GREET',
            greeting: `Hello, ${name}!`
          })
      }
    ]
  }
}

describe('createBoltMiddleware', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('Should return a valid Redux middleware', () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'ACTION'
    })
    expect(next).toHaveBeenCalledTimes(1)
  })

  it('Should let the developer change the propName option', () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'MY_ACTION',
      socket: true
    })
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith({
      type: 'MY_ACTION',
      socket: {
        type: types.send,
        event: events.message
      }
    })
  })

  it("Should'nt handle actions other than Bolt actions", () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'REGULAR_REDUX_ACTION'
    })
    expect(options.queueManager.push).toHaveBeenCalledTimes(0)
  })

  it('Should push every Bolt action to the queue manager', () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'BOLT_ACTION',
      socket: true
    })
    expect(options.queueManager.push).toHaveBeenCalledTimes(1)
  })

  it("Should register Bolt's default handlers", () => {
    const { socket, store } = mocks
    createBoltMiddleware(socket)(store)
    // The number of current default handlers is 7
    expect(socket.on).toHaveBeenCalledTimes(7)
  })

  it("Should let the developer register it's own handlers", () => {
    const { socket, store, options } = mocks
    createBoltMiddleware(socket, options)(store)
    expect(socket.on.mock.calls[0][0]).toBe('hello')
  })

  it('Should thrown an exception when the handler has no event nor handler', () => {
    const { socket, store, options } = mocks
    // 1st scenario: no handler
    expect(() =>
      createBoltMiddleware(socket, {
        handlers: [
          {
            event: 'invalid',
            fn: true
          }
        ]
      })(store)
    ).toThrow(errors.invalidHandler)
    // 2nd scenario: no event
    expect(() =>
      createBoltMiddleware(socket, {
        handlers: [
          {
            action: 'invalid',
            handler: () => () => null
          }
        ]
      })(store)
    ).toThrow(errors.invalidHandler)
  })

  it('Should convert a boolean value to a valid Bolt object', () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'BOLT_ACTION',
      socket: true
    })
    expect(next).toHaveBeenCalledWith({
      type: 'BOLT_ACTION',
      socket: message()
    })
  })

  it("Shouldn't use Bolt when bolt value is set to false", () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket)(store)(next)({
      type: 'BOLT_ACTION',
      bolt: false
    })
    expect(next).toHaveBeenCalledWith({
      type: 'BOLT_ACTION',
      bolt: false
    })
  })

  it('Should ignore Bolt/Receive actions', () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'BOLT_ACTION',
      socket: {
        type: types.receive,
        event: events.message
      }
    })
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith({
      type: 'BOLT_ACTION',
      socket: {
        type: types.receive,
        event: events.message
      }
    })
    expect(options.queueManager.push).toHaveBeenCalledTimes(0)
  })

  it('Should accept a valid Bolt object', () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'JOIN_CHANNEL',
      socket: joinChannel('foobar')
    })
    expect(options.queueManager.push).toHaveBeenCalledTimes(1)
  })

  it("Should not release an action when the socket isn't connected", () => {
    const { socket, store, next, options } = mocks
    socket['connected'] = false
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'BOLT_ACTION',
      socket: true
    })
    expect(options.queueManager.push).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledTimes(1)
    expect(options.queueManager.release).toHaveBeenCalledTimes(0)
  })
})
