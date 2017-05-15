# Redux Bolt

**Bolt** is a middleware for Redux that let's you dispatch Redux Actions to a server running SocketIO. Your actions will then be replicated to all clients listening to that socket or to a specific channel.

**Bolt** allows you to configure it's behavior the way you want. You can chose the property name in your Redux Action responsible of controlling your Bolt Actions and the events you dispatch to your server.

This is a package for the client side only. Although not necessary, it's recommended that you also use [redux-bolt-server](http://github.com/vvinhas/redux-bolt-server) to easily handle Bolt Actions in your SocketIO Server. Please, checkout the package page for more detailed information.

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

Using **Bolt** is very easy! All you need to do is import `createBoltMiddleware` and pass it to your `applyMiddleware` function, like so:

```js
import { createStore, applyMiddleware } from "redux"
import { createBoltMiddleware } from "redux-bolt"

const boltMiddleware = createBoltMiddleware("http://socket-io-server")
const store = createStore(
    <...reducer>,
    applyMiddleware(boltMiddleware)
)
```
That's it! You can already dispatch real time actions setting the `bolt` prop to `true`
```js
store.dispatch({
    type: "HELLO_BOLT",
    foo: "bar",
    bolt: true
})
```

If you don't want `bolt` to be your property responsible for handling your real time actions, you can set the option `propName` to whatever you want.

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

**Bolt** only send to the server the actions you mark with this property.

These are the available options you can set in `createBoltMiddleware`

| Param | Description |
| --- | --- |
| `url` | The URL of your SocketIO server |
| `options` | Options available: <ul><li>`socketOptions (object)`: SocketIO Client options. Please, check [SocketIO](http://socket.io) for more details.</li><li>`propName (string)`: Property in your Redux Actions responsible for handling Bolt Actions. Default to `"bolt"`.</li><li>`queueInterval (number)`: The amount of miliseconds to check for connection. If there's no connection, Bolt put's your dispatched actions in a queue and release them after a connection is estabilished. Default is `1000`.</li></ul> |

## Advanced Usage

## Examples

## License

MIT