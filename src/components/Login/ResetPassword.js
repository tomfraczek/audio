// @flow
import React from 'react';
import type {Node} from 'react';
import styles from './Login.module.css';
import formStyles from '../../styles/form.module.css';

type ResetPasswordType = {
  state: {
    email: string,
    passReset: string,
  },
  handleResetRequest: (string) => void,
  translate: (string) => string,
  handleInput: ('email', Event) => void,
};

const ResetPassword = ({
  state,
  handleResetRequest,
  translate,
  handleInput,
}: ResetPasswordType): Node => (
  <form
    onSubmit={(e: Event) => {
      e.preventDefault();
      handleResetRequest(state.email);
    }}
    className={`
      ${formStyles.form} ${state.passReset ? styles.show : styles.hide}
    `}
  >
    {translate('resetPassword')}:<br />
    <div className={formStyles.inline}>
      <input
        className={formStyles.input}
        onInput={(e: Event): void => handleInput('email', e)}
        type="text"
        value={state.email}
      />
      <input
        className={formStyles.button}
        type="submit"
        value={translate('confirm')} />
    </div>
  </form>
);

export default ResetPassword;
