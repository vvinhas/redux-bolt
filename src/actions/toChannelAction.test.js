import * as Constants from '../constants'
import toChannel from './toChannelAction'

describe('[Action] toChannel', () => {
  it('Returns a Bolt object informing the socket to broadcast to a specific channel', () => {
    const action = {
      type: 'PRIVATE_MESSAGE',
      bolt: toChannel('bolt')
    }
    expect(action.bolt).toEqual({
      type: Constants.types.send,
      event: Constants.events.channelMessage,
      channel: 'bolt'
    })
  })
})
