import * as Constants from '../constants'
import trigger from './triggerAction'

describe('[Action] toChannel', () => {
  const action = {
    type: 'TRIGGER_ACTION',
    bolt: trigger('sayHello')
  }

  it('Returns a Bolt object of type Send containing a Trigger Event', () => {
    expect(action.bolt).toMatchObject({
      type: Constants.types.send,
      event: Constants.events.trigger
    })
  })

  it('Transforms the arguments to an object of listeners', () => {
    expect(action.bolt.trigger).toEqual([
      {
        listener: 'sayHello',
        args: []
      }
    ])
  })

  it('Should accept multiple listeners', () => {
    const chainAction = {
      type: 'CHAIN_ACTION',
      bolt: trigger([
        { listener: 'foo', args: [] },
        { listener: 'bar', args: ['great!'] }
      ])
    }

    expect(chainAction.bolt.trigger).toEqual([
      { listener: 'foo', args: [] },
      { listener: 'bar', args: ['great!'] }
    ])
  })
})
