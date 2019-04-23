import React from 'react';
import styles from './NotFound.module.css';

export default () => {
  return (
    <div className={[styles.for0for].join(' ')}>
      <h1 className="display-4">
        {' '}
        <span className="text-muted">404</span>
        <br />
        Page not found!
      </h1>
      <p className="lead">We are sorry, this page does not exist</p>
    </div>
  );
};
