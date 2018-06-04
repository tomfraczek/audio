// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Page from '../../containers/page/page';
import {register} from '../../redux/actions/register-actions';
import defaultStyle from '../../styles/default.module.css';
import formStyle from '../../styles/form.module.css';
import translate from '../../config/text';
import type {TranslateType} from '../../types';
import countryJson from '../../utility/countries.json';
import {Loading} from '../';

type PropsType = {
  registrationError: string,
  attemptToRegister: ({
    email: string,
    pass: string,
  }) => void,
  isLoggingIn: string,
  isLoggedIn: true,
  location: {
    state: {
      from: {
        pathname: string,
      },
    },
  },
  language: string,
};

type StateType = {
  email: string,
  pass: string,
  firstName: string,
  lastName: string,
  company: string,
  country: string,
};

type KeysType = 'email' | 'pass' | 'firstName'
  | 'lastName' | 'company' | 'country';

class Register extends Component<PropsType, StateType> {
  t: TranslateType
  constructor(props: PropsType) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      firstName: '',
      lastName: '',
      company: '',
      country: 'GB',
    };
    this.t = translate(this.props.language);
  }
  handleInput = (type: KeysType, value: string) => {
    this.setState({
      [type]: value,
    });
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.attemptToRegister({
      email: this.state.email,
      pass: this.state.pass,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      country: this.state.country,
      company: this.state.company,
    });
  }
  render(): Node {
    const {from} = this.props.location.state
      || {from: {pathname: `/courses`}};
    if (this.props.isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <Page title={this.t('register')}>
        <div className={defaultStyle.content}>
          <RegistrationForm
            handleSubmit={this.handleSubmit}
            handleInput={this.handleInput}
            state={this.state}
            errors={this.props.registrationError}
            t={this.t} />
          {
            this.props.isLoggingIn
              ? <Loading text={this.t('registering')} />
              : ''
          }
        </div>
      </Page >
    );
  }
}

type RegistrationFormType = {
  handleSubmit: (Event) => void,
  handleInput: (KeysType, string) => void,
  state: StateType,
  errors: string,
  t: TranslateType,
};

const RegistrationForm = ({
  handleSubmit,
  handleInput,
  state,
  errors,
  t,
}: RegistrationFormType): Node => (
  <form className={formStyle.form} onSubmit={handleSubmit}>
    {
      errors &&
      <div className={formStyle.errors}>
        {errors}
      </div>
    }
    <InputWithLabel
      label={t('email')}
      inputType={'email'}
      value={state.email}
      type={'email'}
      placeholder={''}
      handleInput={handleInput} />
    <InputWithLabel
      label={t('firstName')}
      inputType={'firstName'}
      value={state.firstName}
      type={'text'}
      placeholder={''}
      handleInput={handleInput} />
    <InputWithLabel
      label={t('lastName')}
      inputType={'lastName'}
      value={state.lastName}
      type={'text'}
      placeholder={''}
      handleInput={handleInput} />
    <InputWithLabel
      label={t('company')}
      inputType={'company'}
      value={state.company}
      type={'text'}
      placeholder={''}
      handleInput={handleInput} />
    <SelectWithLabel
      label={t('country')}
      inputType={'country'}
      value={state.country}
      type={'select'}
      placeholder={''}
      handleInput={handleInput} />
    <InputWithLabel
      label={t('password')}
      inputType={'pass'}
      value={state.pass}
      type={'password'}
      placeholder={''}
      handleInput={handleInput} />
    <div className={formStyle.checkbox}>
      <input required type="checkbox" id="tsncs" />
      <label htmlFor="tsncs">
        {t('confirmTsAndCs')}. <a href={
        `https://www.cambridgeaudio.com/gbr/${t('getCurrLang!')}/legal/terms-and-conditions`
      }>View Ts & Cs</a>
      </label><br/>
    </div>
    <input className={formStyle.button} type="submit" value={t('register')} />
  </form>
);

type LabelFormsType = {
  label: string,
  inputType: KeysType,
  value: string,
  type: string,
  placeholder: string,
  handleInput: (KeysType, string) => void,
  props?: any,
};

const InputWithLabel = ({
  label,
  inputType,
  value,
  type,
  placeholder,
  handleInput,
  ...props
}: LabelFormsType): Node => (
  <label className={formStyle.label}>
    <div className={formStyle.heading}>
        {label}*
    </div>
    <input
      onInput={(e: Event): void =>// $FlowFixMe
        handleInput(inputType, e.target.value)
      }
      className={formStyle.input}
      value={value}
      type={type}
      placeholder={placeholder}
      required />
  </label>
);

const SelectWithLabel = ({
  label,
  inputType,
  value,
  type,
  placeholder,
  handleInput,
  ...props
}: LabelFormsType): Node => (
  <label className={formStyle.label}>
    <div className={formStyle.heading}>
      {label}*
    </div>
    <select
      onChange={(e: Event): void =>// $FlowFixMe
        handleInput(inputType, e.target.value)
      }
      defaultValue={value ? value : 'GB'}
      className={formStyle.select}
      required
    >
      {
        Object.keys(countryJson).map((iso: string): Node => (
          <option key={iso} value={iso}>
            {countryJson[iso]}
          </option>
        ))
      }
    </select>
  </label>
);

type LoginDataType = {
  email: string,
  pass: string,
  firstName: string,
  lastName: string,
  country: string,
  company: string,
};

const mapStateToProps = (state: {status: ?{}}): ?{} => state.status;

const mapDispatchToProps = (
  dispatch: (register: () => void) => void
): {attemptToRegister: any} => ({
  attemptToRegister: (
    registerParams: LoginDataType
  ): void => dispatch(register(registerParams)),
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
