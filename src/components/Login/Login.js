// @flow
import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Page from '../../containers/page/page.js';
import ResetPassword from './ResetPassword';
import translate from '../../config/text';
import type {TranslateType} from '../../types';
import defaultStyle from '../../styles/default.module.css';
import formStyle from '../../styles/form.module.css';
import styles from './Login.module.css';
import {Loading} from '../';

type PropsType = {
  location: {
    state: {
      from: {
        pathname: string,
      },
    },
  },
  attemptLogin: ({
    email: string,
    pass: string,
  }) => void,
  resetPassword: (
    email: string
  ) => void,
  status: {
    isLoggedIn: boolean,
    isLoggingIn: boolean,
    error: string,
    language: string,
  },
};

type StateType = {
  email: string,
  pass: string,
  passReset: boolean,
  resetSuccess: string,
};

class Login extends Component<PropsType, StateType> {
  translate: TranslateType
  constructor(props: PropsType) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      passReset: false,
      resetSuccess: '',
    };
    this.translate = translate(this.props.status.language);
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.attemptLogin({
      email: this.state.email,
      pass: this.state.pass,
    });
  }
  handleInput = (type: string, event: {target: {value: string}}) => {
    this.setState({
      [type]: event.target.value,
    });
  }
  toggleReset = () => {
    this.setState((prevState: StateType): StateType => {
      return Object.assign({}, prevState, {
        passReset: !prevState.passReset,
      });
    });
  }
  handleResetRequest = (email: string) => {
    // $FlowFixMe
    this.props.resetPassword(email).then((res: boolean) => {
      if (res) {
        this.setState({
          resetSuccess: this.translate('resetSuccess'),
          passReset: false,
        });
      }
    });
  }
  render(): * {
    const {from} = this.props.location.state
      || {from: {pathname: `/courses`}};
    if (this.props.status.isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <Page title={this.translate('signIn')}>
        <div className={defaultStyle.content}>
          {
            this.props.status.error
              ? <div className={formStyle.errors}>
                  {this.props.status.error}
                </div>
              : ''
          }
          {
            this.state.resetSuccess
              ? <div className={formStyle.success}>
                  {this.state.resetSuccess}
                </div>
              : ''
          }
          <form
            className={`
              ${formStyle.form}
              ${this.state.passReset ? styles.hide : styles.show}
            `}
            onSubmit={this.handleSubmit}
          >
            <label className={formStyle.label}>
              <div className={formStyle.heading}>
                {this.translate('email')}:&nbsp;
              </div>
              <input
                type="text"
                value={this.state.email}
                className={formStyle.input}
                onInput={
                  (e: {target: {value: string}}): void =>
                    this.handleInput('email', e)
                } />
            </label>
            <label className={formStyle.label}>
              <div className={formStyle.heading}>
                {this.translate('password')}:&nbsp;
              </div>
              <input
                type="password"
                value={this.state.pass}
                className={formStyle.input}
                onInput={
                  (e: {target: {value: string}}): void =>
                    this.handleInput('pass', e)
                } />
            </label>
            <input
              className={formStyle.button}
              type="submit"
              value={this.translate('signIn')} />
          </form>
          {
            this.props.status.isLoggingIn
              ? <Loading text={this.translate('loggingIn')} />
              : ''
          }
          <ResetPassword
            // $FlowFixMe
            state={this.state}
            // $FlowFixMe
            handleInput={this.handleInput}
            translate={this.translate}
            handleResetRequest={this.handleResetRequest}
          />
          <div className={styles.links}>
            <Link to={'/register'} className={defaultStyle.link}>
              {
                !this.state.passReset && 'Register'
              }
            </Link>
            <button
              className={defaultStyle.link}
              onClick={(): void => this.toggleReset()}
            >
              {
                this.state.passReset
                  ? this.translate('cancel')
                  : this.translate('resetPass')
              }
            </button>
          </div>
        </div>
      </Page>
    );
  }
}

export default Login;
