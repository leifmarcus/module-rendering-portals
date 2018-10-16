import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import classNames from './App.css';

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

const pubSub = window.pubSub = new PubSub();

pubSub.subscribe( 'UPDATE', () => {
    if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
        pubSub.publish( 'READY' );
    }
} );
pubSub.subscribe( 'READY', () => {
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

document.addEventListener( 'DOMContentLoaded', () => {
    pubSub.publish( 'READY' );
} );
