# Redux Bolt

**Bolt** is a small middleware for Redux that let's you dispatch Redux Actions to a server running SocketIO. Your actions will then be replicated to all clients listening to that socket or to a specific channel.

**Bolt** allows you to configure it's behavior the way you want. You can chose the property name in your Redux Action responsible of controlling your real time actions and events you dispatch to the server.

This is a package for the client side only. Although not necessary, it's recommended that you also use [redux-bolt-server](http://github.com/vvinhas/redux-bolt-server) to easily handle Bolt Actions in your SocketIO Server. Please, checkout the package repository for more information.

### WIP

This package is under heavy development. Use it in a production environment is very risky and not recommended.

## Motivation

Redux offers the cool concept of actions that represent user interactions most of the time, so, why not take this interaction made by one user and replicate it to every other user connected to our app? This way, assuming that they all have the same state and a stable connection, the result of an action beign dispatched will be the same for every user.

**Bolt** transforms these interactions into real time actions that runs through the reducers of every connected socket.

**Bolt** use actions because they're lightweight and let reducers know how to change state. Since reducers are pure functions, if the action is the same, the result will be the same.

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
import { createStore, applyMiddleware } from "redux"
import { createBoltMiddleware } from "redux-bolt"
import rootReducer from "../reducers"

const boltMiddleware = createBoltMiddleware("http://socket-io-server")
const store = createStore(
    rootReducer,
    applyMiddleware(boltMiddleware)
)
```
That's it! You can already dispatch real time actions setting `bolt: true`
```js
store.dispatch({
    type: "HELLO_BOLT",
    foo: "bar",
    bolt: true
})
```

If you don't want `bolt` to be the property responsible for handling your real time actions, you can set the option `propName` to whatever you want.

```js
import { createBoltMiddleware } from "redux-bolt"

const boltMiddleware = createBoltMiddleware("http://socket-io-server", {
    propName: "socket"
})
```

Now you can dispatch your actions setting `socket: true`

```js
store.dispatch({
    type: "HELLO_BOLT",
    foo: "bar",
    socket: true
})
```

**Bolt** only emit the events you mark with this property.

These are the available options you can set in `createBoltMiddleware`

| Param | Description |
| --- | --- |
| `url` | The URL of your SocketIO server |
| `options` | Options available: <ul><li>`socketOptions (object)`: SocketIO Client options. Please, refer to [SocketIO Documentation](https://socket.io/docs/client-api/#manager) for more information.</li><li>`propName (string)`: Property in your Redux Actions responsible for handling Bolt Actions. Default to `"bolt"`.</li><li>`queueInterval (number)`: The amount of miliseconds to check for connection. If there's no connection, Bolt put's your dispatched actions in a queue and release them after a connection is estabilished. Default is `1000`.</li></ul> |

## Helpers

### Action Flow

Sometimes you need to know if the action is being sent or received from the server. **Bolt** makes that pretty easy by using `isSending` or `isReceiving` helper functions.

| Helper | Description |
| --- | --- |
| `isSending(action: object)` | Checks if the action is being sent to the server |
| `isReceiving(action: object)` | Checks if the action is being received from the server |

#### Example

```js
//ChatReducer.js
import { isSending } from "redux-bolt"

const chatReducer = (state = [], action) => {
    switch (action.type) {
        case "NEW_USER":
            // If the action is being received from the server, we inform the other users
            return isReceiving(action) ?
                [...state, `User ${action.user} joined the room!`] : state
        default:
            return state
    }
}
```

### Channels

**Bolt** allows you to emit events to specific channels as well. To do so, you must use the helper functions provided with the package.

| Helper | Description |
| --- | --- |
| `joinChannel(channel: string)` | Informs your server to connect the socket to a specific channel |
| `leaveChannel(channel: string)` | Informs your server to disconnect the socket from a specific channel |
| `toChannel(channel: string)` | Informs your server to send a message to a specific channel only |

#### Example

```js
import { joinChannel, toChannel } from "redux-bolt"

// Connects the socket to channel "foobar"
store.dispatch({
    type: "JOIN_CHANNEL",
    bolt: joinChannel("foobar")
})

// Only sockets connected to "foobar" channel will receive this action
store.dispatch({
    type: "PRIVATE_MESSAGE",
    bolt: toChannel("foobar")
})
```

## Challenges

Most challenges consists on granting a atomic state across users and a stable connection.

_More details soon_.

## License

MIT