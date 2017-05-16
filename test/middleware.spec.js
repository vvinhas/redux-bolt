import { createBoltMiddleware } from '../src'

describe('Redux-Bolt Middleware', () => {
  const fakeUrl = 'http://0.0.0.0'
  const boltMiddleware = createBoltMiddleware(fakeUrl)

  it('Should return a function', () => {
    expect(typeof boltMiddleware).toBe('function')
  })
})
