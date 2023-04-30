import React from 'react';
import WithPermission from '../private-route/WithPermission';

const access = () => {
  return (
    <div className='access'>
      <h1 style={{textAlign: 'center'}}>access</h1>
      <WithPermission roleRequired='OWNER' message='successful operation'>
            test
      </WithPermission>
    </div>
  );
};

export default access;