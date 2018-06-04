// @flow
import React from 'react';
import type {Node} from 'react';
import type {TranslateType} from '../../types.js';

type StateType = {
  completed: boolean,
  submitted: boolean,
  passed: boolean,
  error: string
};

type MethodsType = {
  handleSubmit: () => void,
  reset: () => void,
  completeAssessmentButton: () => void
};

const AssessmentButtons = ({
  state,
  methods,
  t,
}: {state: StateType, methods: MethodsType, t: TranslateType}): Node => (
  <div>
      {
        !state.submitted
        && <button onClick={(): void => methods.handleSubmit()}>
          {t('checkAnswers')}
        </button>
      }
      {
        state.submitted && !state.passed
        && <button onClick={(): void => methods.reset()}>
          {t('tryAgain')}
        </button>
      }
      {
        state.submitted && state.passed
        && <button onClick={(): void => methods.completeAssessmentButton()}>
          {t('complete')}
        </button>
      }
  </div>
);

export default AssessmentButtons;
