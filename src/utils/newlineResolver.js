import React, { Fragment } from 'react';

export default str => (
  <Fragment>
    {str.split('\n').map((s, i) => (
      <Fragment key={i}>
        {s}<br />
      </Fragment>
    ))}
  </Fragment>
);