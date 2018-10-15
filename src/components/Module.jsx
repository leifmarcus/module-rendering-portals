import React from 'react';
import PropTypes from 'prop-types';

/**
 * example module
 * @param {object} props
 * @return {JSX} module element
 */
export const Module = ( { moduleId, counter } ) => {
    const style = {
        color : counter % 10 === 0 ? 'red' : 'black',
    };

    return (
        <div style={ style }>
            Module Id: { moduleId }, counter: { counter }
        </div>
    );
};

Module.propTypes = {
    moduleId : PropTypes.string,
    counter  : PropTypes.number,
};
