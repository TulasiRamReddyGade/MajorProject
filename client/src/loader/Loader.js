import React from 'react';

const Loader = () => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                zIndex: '99999999',
                position: 'absolute',
                backgroundColor: 'rgba(128,128,128,.5)'
            }}
        ></div>
    );
};

export default Loader;
