import { types, events } from './constants'
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
    }
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
    expect(next.mock.calls.length).toBe(1)
  })

  it('Should let the developer change the propName option', () => {
    const { socket, store, next, options } = mocks
    createBoltMiddleware(socket, options)(store)(next)({
      type: 'MY_ACTION',
      socket: true
    })
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toEqual({
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
    expect(options.queueManager.push.mock.calls.length).toBe(0)
  })

  it('Should push every Bolt action to the queue manager', () => {})
  it("Should register Bolt's default handlers", () => {})
  it("Should let the developer register it's own handlers", () => {})
  it('Should thrown an exception when the handler has no event nor handler', () => {})
  it('Should register the handlers to the socket', () => {})
  it('Should convert a boolean value to a valid Bolt object', () => {})
  it('Should ignore Bolt/Receive actions', () => {})
  it("Should not release an action when the socket isn't connected", () => {})
})
