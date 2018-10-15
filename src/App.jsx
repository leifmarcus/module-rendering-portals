import React from 'react';
import ReactDOM from 'react-dom';
import { Module } from './components/Module.jsx';

export default class App extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            elements : [],
            counter  : 0,
        };
    }
    componentDidMount() {
        const elements = Array.from( document.querySelectorAll( '[data-styla-module-id]' ) );

        this.setState( { elements } );

        setInterval( () => {
            this.setState( prevState => ( { counter : prevState.counter += 1 } ) );
        }, 500 );
    }

    render() {
        const { elements, counter } = this.state;

        if ( elements.length === 0 ) {
            return <div>No Elements</div>;
        }

        return elements.map( ( element, index ) => {
            const moduleId = element.dataset.stylaModuleId;
            const counterOverwrite = element.dataset.stylaCounterOverwrite;
            const finalCounter = counterOverwrite || counter + index;

            return ReactDOM.createPortal( <Module moduleId={ moduleId } counter={ finalCounter } />, element );
        } );
    }
}
