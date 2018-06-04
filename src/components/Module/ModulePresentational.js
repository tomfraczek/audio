// @flow
import React from 'react';
import type {Node} from 'react';
import styles from './Module.module.css';

type ModuleInformationType ={
  courseName: string,
  moduleName: string,
  currentModuleComponent: number,
  moduleComponentLength: number
};

export const ModuleInformation = ({
  courseName,
  moduleName,
  currentModuleComponent,
  moduleComponentLength,
}: ModuleInformationType): Node => (
  <div className={styles.header}>
    <h1>{courseName} – <span>{moduleName}</span></h1>
    <div className={styles.status}>
      {currentModuleComponent} / {moduleComponentLength}
    </div>
  </div>
);

