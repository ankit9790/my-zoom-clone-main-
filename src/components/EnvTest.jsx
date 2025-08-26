import React from 'react';

const EnvTest = () => {
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '10px' }}>
      <h3>Environment Variables Test</h3>
      <p>REACT_APP_HOST: {process.env.REACT_APP_HOST || 'Not set'}</p>
      <p>REACT_APP_ZEGOCLOUD_APP_ID: {process.env.REACT_APP_ZEGOCLOUD_APP_ID || 'Not set'}</p>
      <p>REACT_APP_ZEGOCLOUD_SERVER_SECRET: {process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET ? 'Set (hidden)' : 'Not set'}</p>
    </div>
  );
};

export default EnvTest;
