# ⚡️ Redux Bolt

[![Travis](https://img.shields.io/travis/vvinhas/redux-bolt.svg?style=flat-square)](https://travis-ci.org/vvinhas/redux-bolt?branch=master)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/vvinhas/redux-bolt.svg?style=flat-square)](https://codeclimate.com/github/vvinhas/redux-bolt)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/vvinhas/redux-bolt.svg?style=flat-square)](https://codeclimate.com/github/vvinhas/redux-bolt)
![GitHub](https://img.shields.io/github/license/vvinhas/redux-bolt.svg?style=flat-square)
[![npm](https://img.shields.io/npm/v/redux-bolt.svg?style=flat-square)](https://www.npmjs.com/package/redux-bolt)

**Bolt** is a small middleware for Redux that let's you dispatch marked Redux Actions to a server running SocketIO. Your actions will then be replicated to all clients listening to that socket or to a specific channel.

**Bolt** allows you to configure it's behavior the way you want. You can choose the property name in your Redux Action responsible of controlling your real time actions and events you dispatch to the server.

**Bolt** also comes with a [server side handler](http://github.com/vvinhas/redux-bolt-server) to to easily handle Bolt Actions in your SocketIO Server. Please, checkout the package repository for more information.

### WIP

This package is under heavy development. Using it in a production environment is very risky and not recommended.

## Motivation

Creating real time applications can be very tedious and quickly become a truly nightmare due to the amount of sparsed events and the handle of these events. Redux offers an excelent way to centralize the state of an application in a single Store, where Actions are the only responsible to inform the Store how it should be updated.

**Bolt** makes use of this centralized platform provided by Redux to dispatch events to all your connected sockets, being easily integrated to the existent ecossystem of an application using Redux, turning the task to manage these real time events, trivial.

**Bolt** use actions because they're lightweight and let reducers know how to change state, when necessary.

## Installation

To install the stable version of `redux-bolt` using NPM:

```
npm run --save redux-bolt
```

You can also use `yarn`

```
yarn add redux-bolt
```

## Usage

**Bolt** is very easy to use! All you need to do is call `createBoltMiddleware` and pass the result to `applyMiddleware`.

```js
import { createStore, applyMiddleware } from 'redux'
import io from 'socket.io-client'
import { createBoltMiddleware } from 'redux-bolt'
import rootReducer from '../reducers'

const socket = io('http://localhost:3001') // The host running your SocketIO
const bolt = createBoltMiddleware(socket)
const store = createStore(rootReducer, applyMiddleware(bolt))
```

That's it! You can already dispatch real time actions setting `bolt: true`

```js
store.dispatch({
  type: 'HELLO_BOLT',
  foo: 'bar',
  bolt: true
})
```

If you don't want `bolt` to be the property responsible for handling your real time actions, you can set the option `propName` to whatever you want.

```js
const boltMiddleware = createBoltMiddleware(socket, {
  propName: 'socket'
})
```

Now you can dispatch your actions setting `socket: true`

```js
store.dispatch({
  type: 'HELLO_BOLT',
  foo: 'bar',
  socket: true
})
```

**Bolt** only emit the events you mark with this property.

These are the available options you can set in `createBoltMiddleware`

| Param     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `socket`  | A SocketIO WebSocket                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `options` | Options available: <ul><li>`propName (string)`: Property in your Redux Actions responsible for handling Bolt Actions. Default to `"bolt"`.</li><li>`queueManager (object)`: the queue manager object. Check the Queue Manager documentation for more information. Default is an instance of `QueueManager`</li><li>`queueInterval (number)`: The amount of miliseconds to check for connection. If there's no connection, Bolt put's your dispatched actions in a queue and release them after a connection is estabilished. Default is `1000`.</li><li>`listeners (object)`: an object containing the all your app listeners. Useful when your app uses thunks. Default to `{}`</li><li>`handlers (array)`: You can also set your own event handlers. To do that, check the Custom Handlers documentation. Default `[]`</li></ul> |

## Helpers

### Action Flow

Sometimes you need to know if the action is being sent or received from the server. **Bolt** makes that pretty easy by using `isSending` or `isReceiving` helper functions.

| Helper                        | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `isSending(action: object)`   | Checks if the action is being sent to the server       |
| `isReceiving(action: object)` | Checks if the action is being received from the server |

#### Example

```js
//ChatReducer.js
import { isSending } from 'redux-bolt'

const chatReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_USER':
      // If the action is being received from the server, we inform the other users
      return isReceiving(action)
        ? [...state, `User ${action.user} joined the room!`]
        : state
    default:
      return state
  }
}
```

### Channels

**Bolt** allows you to emit events to specific channels as well. To do so, you must use the helper functions provided with the package.

| Helper                          | Description                                                          |
| ------------------------------- | -------------------------------------------------------------------- |
| `joinChannel(channel: string)`  | Informs your server to connect the socket to a specific channel      |
| `leaveChannel(channel: string)` | Informs your server to disconnect the socket from a specific channel |
| `toChannel(channel: string)`    | Informs your server to send a message to a specific channel only     |

#### Example

```js
import { joinChannel, toChannel } from 'redux-bolt'

// Connects the socket to channel "foobar"
store.dispatch({
  type: 'JOIN_CHANNEL',
  bolt: joinChannel('foobar')
})

// Only sockets connected to "foobar" channel will receive this action
store.dispatch({
  type: 'PRIVATE_MESSAGE',
  bolt: toChannel('foobar')
})
```

## Contributing

Soon.

## Challenges

Most challenges consists on granting a atomic state across users and a stable connection.

_More details soon_.

## License

MIT
