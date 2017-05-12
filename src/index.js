import io from 'socket.io-client'
import defaultOptions from './defaultOptions'
import createBoltMiddleware from './createBoltMiddleware'
import isReceiving from './isReceiving'
import isSending from './isSending'
import joinChannel from './joinChannel'
import leaveChannel from './leaveChannel'

export {
  createBoltMiddleware,
  isReceiving,
  isSending,
  joinChannel,
  leaveChannel
}