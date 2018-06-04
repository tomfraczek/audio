// @flow

import React from 'react';
import type {Node} from 'react';
// import {Link} from 'react-router-dom';
import styles from './Module.module.css';
import type {TranslateType} from '../../types';

type ModuleProgressType = {
  state: {
    nextButtonDisabled: boolean,
    visibleModuleComponent: number
  },
  moduleComponentLength: number,
  update: {
    decrement: () => void,
    increment: () => void,
    complete: () => void
  },
  courseId: string,
  t: TranslateType
};

export const ModuleProgress = ({
  state,
  moduleComponentLength,
  update,
  t,
  // courseId,
}: ModuleProgressType): Node => (
    <div className={styles.progress}>
      <ProgressButton
        label={t('previous')}
        update={update.decrement}
        visibility={
          state.visibleModuleComponent > 1 ? 'block' : 'none'
        } />
      <ProgressButton
        label={t('next')}
        update={update.increment}
        visibility={
          state.visibleModuleComponent < moduleComponentLength
            ? 'block'
            : 'none'
        }
        className={styles.progressRight}
        disabled={state.nextButtonDisabled} />
      <ProgressButton
        label={t('complete')}
        update={update.complete}
        visibility={
          state.visibleModuleComponent === moduleComponentLength
            ? 'block'
            : 'none'
        }
        disabled={state.nextButtonDisabled} />
      {/*
        TODO: add warning, you'll lose your progress,
        maybe listen for user pressing back button
      */}
      {/* <Link to={`/course/${courseId}`}>
        (back to course)
      </Link> */}
    </div>
  );

type ProgressButtonType = {
  label: string,
  update: () => void,
  visibility: 'block' | 'none',
  props?: {}
};

const ProgressButton = ({
  label,
  update,
  visibility,
  ...props
}: ProgressButtonType): Node =>
  <button
    style={{display: visibility}}
    onClick={(): void => update()} {...props}>{label}</button>;
