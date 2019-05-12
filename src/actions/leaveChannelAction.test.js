import * as Constants from '../constants'
import leaveChannel from './leaveChannelAction'

describe('[Action] leaveChannel', () => {
  it('Returns a Bolt object informing the channel to leave', () => {
    const action = {
      type: 'LEAVE_BOLT_CHANNEL',
      bolt: leaveChannel('bolt')
    }
    expect(action.bolt).toEqual({
      type: Constants.types.send,
      event: Constants.events.leaveChannel,
      channel: 'bolt'
    })
  })
})
