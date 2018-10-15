import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import classNames from './App.css';

const rootElement = document.getElementById( 'app' );
rootElement.classList.add( classNames.App );

render( <App />, rootElement );
