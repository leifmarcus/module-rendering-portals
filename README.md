# Testing Portal rendering for Modules

This example shows how to render different modules in one page by using react portals. This mechanism can also be used to render modules of a page inside the editor.

The app still needs a main app element, but will render all elements based on the data received from the dataset with react portals.

```bash
# install dependencies:
npm install

# start project:
npm start

# open local project:
open http://localhost:8080
```

## Events

In order to test the behavior on updates you can play with some events
in the developer console

```javascript
// remove APP:
pubSub.publish( 'DESTROY' );

// initialize app:
pubSub.publish( 'READY' );

// update (will add a new module element)
pubSub.publish( 'UPDATE' );
```
