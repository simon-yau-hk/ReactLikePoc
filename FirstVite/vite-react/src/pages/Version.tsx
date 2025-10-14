import React from 'react';
import versionInfo from '~/version.json';

const Version = () => {
    alert('Component loaded');
    console.log('Environment:', import.meta.env);
    return (
        <div className="version">
            Version 1: {versionInfo.version}
        </div>
    );
};

export default Version;