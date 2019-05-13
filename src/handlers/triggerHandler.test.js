import { events } from '../constants'
import { errors } from '../messages'
import triggerHandler from './triggerHandler'

const mockDispatch = jest.fn()
const mockOptions = {
  propName: 'bolt',
  listeners: {
    foobar: jest.fn(name => `Hello, ${name}!`)
  }
}

describe('[Handler] triggerHandler', () => {
  it("Returns a trigger event", () => {
    expect(triggerHandler.event).toBe(events.trigger)
  })

  it("Throws an error if the trigger object is invalid", () => {
    const badTriggerAction = {
      type: events.trigger,
      bolt: { trigger: 'foobar' }
    }

    expect(() => triggerHandler.handler({
      dispatch: mockDispatch,
      options: mockOptions
    })(badTriggerAction)).toThrowError(errors.triggerObjectMalformed)
  })

  it("Calls the listener with the passed arguments", () => {
    const triggerAction = {
      type: events.trigger,
      bolt: {
        trigger: [{
          listener: 'foobar',
          args: ['Bolt']
        }]
      }
    }

    triggerHandler.handler({
      dispatch: mockDispatch,
      options: mockOptions
    })(triggerAction)

    expect(mockDispatch.mock.calls.length).toBe(1)
    expect(mockOptions.listeners.foobar.mock.results[0].value).toBe('Hello, Bolt!')
  })

  it("Should call multiple listeners", () => {
    
  })
});
