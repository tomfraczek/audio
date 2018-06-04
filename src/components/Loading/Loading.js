// @flow
import React from 'react';
import type {Node} from 'react';
import styles from './Loading.module.css';
import logo from '../../assets/spinner.png';

const Loading = ({text}: {text: string}): Node => (
  <div className={styles.loading}>
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <img src={logo} alt={'Logo spinning'} />
      </div>
      <div className={styles.text}>
        <h2>{text}</h2>
      </div>
    </div>
  </div>
);

export default Loading;
