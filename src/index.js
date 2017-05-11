import io from 'socket.io-client'
import defaultOptions from './defaultOptions'
import createBoltMiddleware from './createBoltMiddleware'
import isReceiving from './isReceiving'
import isSending from './isSending'
import joinChannel from './joinChannel'
import leaveChannel from './leaveChannel'

/**
 * Client Socket instance
 * 
 * @type Socket
 */
let socket

/**
 * Global options
 * @type object
 */
let options = defaultOptions

/**
 * Getter for the socket instance
 * 
 * @return Socket
 */
export const getSocket = () => socket

/**
 * Getter for Bolt defined options
 * 
 * @return object
 */
export const getOptions = () => options

export {
  createBoltMiddleware,
  isReceiving,
  isSending,
  joinChannel,
  leaveChannel
}