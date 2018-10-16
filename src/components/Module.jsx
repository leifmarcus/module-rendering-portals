import React from 'react';
import PropTypes from 'prop-types';

/**
 * example module
 * @param {object} props
 * @return {JSX} module element
 */
export class Module extends React.Component {
    componentDidMount() {
        console.log( 'module did mount', this.props.moduleId );
    }

    render() {
        const { counter, moduleId } = this.props;
        const style = {
            color : counter % 10 === 0 ? 'red' : 'black',
        };

        return (
            <div style={ style }>
                Module Id: { moduleId }, counter: { counter }
            </div>
        );
    }
}

Module.propTypes = {
    moduleId : PropTypes.string,
    counter  : PropTypes.number,
};
