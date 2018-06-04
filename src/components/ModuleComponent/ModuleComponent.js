// @flow
/**
 * Depending on type passed to it shows
 * a type of lesson or test
 */
import React from 'react';
import type {Node} from 'react';
import {Lesson} from './Lesson.js';
import {
  MultipleChoice,
} from './Multiple-Choice.js';
import type {
  MultiChoiceFieldsType,
  LessonFieldsType,
  TranslateType,
} from '../../types.js';

type ModuleComponentContainerType = {
  moduleComponent: MultiChoiceFieldsType | LessonFieldsType,
  t: TranslateType,
};

export const ModuleComponent = ({
  moduleComponent,
  t,
}: ModuleComponentContainerType
): Node => {
  // TODO: transitions
  // $FlowFixMe
  switch (moduleComponent.type[0].target_id) {
    case 'lesson':
      return (
        <Lesson {...moduleComponent} />
      );
    case 'question':
      return (
        // $FlowFixMe
        <MultipleChoice t={t} {...moduleComponent} />
      );
    default:
      return <div>Error - Check ModuleComponent Types</div>;
  }
};

type ModuleComponentVisibilityType = {
  isVisible: {
    thisId: number,
    visibleId: number,
  },
  children: Node,
};

export const ModuleComponentVisibility = ({
  isVisible,
  children,
}: ModuleComponentVisibilityType): Node => {
  const {thisId, visibleId} = isVisible;
  return (
    <div style={{display: thisId === visibleId ? 'block' : 'none'}}>
      { children }
    </div>
  );
};
