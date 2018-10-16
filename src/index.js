import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App.jsx';
import classNames from './App.css';
/**
 * Simple pub sub event handler
 * to trigger updates on the application for testing
 *
 * @class PubSub
 */
class PubSub {
    constructor() {
        this.listeners = [];
    }
    subscribe( type, callback ) {
        this.listeners.push( {
            type,
            callback,
        } );
    }
    unsubscribe( type, callback ) {
        this.listeners = this.listeners.filter( action => {
            return action.type !== type && action.callback !== callback;
        } );
    }
    publish( type, payload ) {
        const typedListeners = this.listeners.filter( action => action.type === type );
        typedListeners.forEach( listener => {
            requestAnimationFrame( () => {
                listener.callback( payload );
            } );
        } );
    }
}

// --------------------------------------------------------
// expose pubSub to the public:
const pubSub = window.pubSub = new PubSub();

// --------------------------------------------------------
// define some pubsub events

// update test
pubSub.subscribe( 'UPDATE', () => {
    if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
        pubSub.publish( 'READY' );
    }
} );

// trigger when ready
pubSub.subscribe( 'READY', () => {
    // create new element to check if the updating
    // works for newly added elements
    const div = document.createElement( 'div' );
    div.dataset.stylaModuleId = Math.round( Math.random() * 10000 );
    document.querySelector( '.global-modules' ).appendChild( div );

    requestAnimationFrame( () => {
        const elements = Array.from( document.querySelectorAll( '[data-styla-module-id]' ) );

        const rootElement = document.getElementById( 'app' );
        rootElement.classList.add( classNames.App );
        render( <App elements={ elements } />, rootElement );
    } );
} );

// remove App from dom:
pubSub.subscribe( 'DESTROY', () => {
    const destoyed = unmountComponentAtNode( document.getElementById( 'app' ) );
    console.log( 'is destoyed', destoyed );
} );

// --------------------------------------------------------
// trigger ready event:
document.addEventListener( 'DOMContentLoaded', () => {
    pubSub.publish( 'READY' );
} );
