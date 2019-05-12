import * as Constants from '../constants'
import joinChannel from './joinChannelAction'

describe('[Action] joinChannel', () => {
  it('Returns a Bolt object containing the informed channel', () => {
    const action = {
      type: 'JOIN_BOLT_CHANNEL',
      bolt: joinChannel('bolt')
    }
    expect(action.bolt).toEqual({
      type: Constants.types.send,
      event: Constants.events.joinChannel,
      channel: 'bolt'
    })
  })
})
