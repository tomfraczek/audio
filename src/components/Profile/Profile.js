// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import type {
  ReduxStatusType,
  TranslateType,
} from '../../types';
import defaultStyles from '../../styles/default.module.css';
import formStyles from '../../styles/form.module.css';
import styles from './Profile.module.css';
import {
  changeUserDetails,
  changeEmail,
  removeMessages,
} from '../../redux/actions/action-creators';
import countryJson from '../../utility/countries.json';
import ChangeEmail from './ChangeEmail';
import translation from '../../config/text';

type StateType = {
  firstName: string,
  lastName: string,
  company: string,
  country: string,
  email: string,
  userEditIsVisible: {
    firstName: boolean,
    lastName: boolean,
    company: boolean,
    country: boolean,
    email: boolean,
  },
};

export type KeyType = 'firstName'
  | 'lastName' | 'company' | 'country' | 'email';

type PropsType = {
  status: ReduxStatusType,
  confirmUserEdit: (string, string) => void,
  changeEmail: (string) => void,
  cancelMessages: () => void,
};

class Profile extends Component<PropsType, StateType> {
  t: TranslateType
  constructor(props: PropsType) {
    super(props);
    this.state = {
      firstName: this.props.status.firstName,
      lastName: this.props.status.lastName,
      company: this.props.status.company,
      country: this.props.status.country,
      email: this.props.status.email,
      userEditIsVisible: {
        firstName: false,
        lastName: false,
        company: false,
        country: false,
        email: false,
      },
    };
    this.t = translation(this.props.status.language);
  }
  handleUserEdit = (key: KeyType, value: string) => {
    if (typeof value === 'string') {
      this.setState({
        [key]: value,
      });
    }
  }
  handleSubmit = (key: KeyType) => {
    if (this.state[key] !== '') {
      this.props.confirmUserEdit(key, this.state[key]);
      this.handleUserEditIsVisible(key);
    }
  }
  handleUserEditIsVisible = (
    key: KeyType
  ) => {
    this.setState((prevState: StateType): StateType => (
      Object.assign({}, prevState, {
        userEditIsVisible: Object.assign({}, prevState.userEditIsVisible, {
          [key]: !prevState.userEditIsVisible[key],
        }),
      })
    ));
  }
  handleEmailChange = () => {
    this.props.changeEmail(this.state.email);
  }
  componentWillUnmount() {
    this.props.cancelMessages();
  }
  render(): * {
    return (
      <Page title={this.t('profile')}>
        <div className={defaultStyles.content}>
          {
            this.props.status.error
              ? <div className={formStyles.errors}>
                {this.props.status.error}
              </div>
              : ''
          }
          {
            this.props.status.success
              ? <div className={formStyles.success}>
                {this.t(this.props.status.success)}
              </div>
              : ''
          }
          <EditUserField
            label={this.t('firstName')}
            stateKey={'firstName'}
            value={this.props.status.firstName}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.firstName}
            handleUserEditIsVisible={this.handleUserEditIsVisible}
            t={this.t}
            editType={
              (): Node =>
                <InputForUser
                  type={'text'}
                  value={this.state.firstName}
                  handleUserEdit={this.handleUserEdit}
                  stateKey={'firstName'} />
            } />
          <EditUserField
            label={this.t('lastName')}
            stateKey={'lastName'}
            value={this.props.status.lastName}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.lastName}
            handleUserEditIsVisible={this.handleUserEditIsVisible}
            t={this.t}
            editType={
              (): Node =>
                <InputForUser
                  type={'text'}
                  value={this.state.lastName}
                  handleUserEdit={this.handleUserEdit}
                  stateKey={'lastName'} />
            }/>
          <EditUserField
            label={this.t('company')}
            stateKey={'company'}
            value={this.props.status.company}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.company}
            handleUserEditIsVisible={this.handleUserEditIsVisible}
            t={this.t}
            editType={
              (): Node =>
                <InputForUser
                  type={'text'}
                  value={this.state.company}
                  handleUserEdit={this.handleUserEdit}
                  stateKey={'company'} />
            } />
          <EditUserField
            label={this.t('country')}
            stateKey={'country'}
            value={countryJson[this.props.status.country]}
            editedValue={this.state.country}
            handleUserEdit={this.handleUserEdit}
            handleUserSubmission={this.handleSubmit}
            userEditIsVisible={this.state.userEditIsVisible.country}
            handleUserEditIsVisible={this.handleUserEditIsVisible}
            t={this.t}
            editType={
              (): Node =>
                <SelectCountryForUser
                  value={this.state.country}
                  handleUserEdit={this.handleUserEdit}
                  stateKey={'country'} />
            } />
          <ChangeEmail {...{
            t: this.t,
            email: this.props.status.email,
            editValue: (): Node =>
              <InputForUser
                type={'email'}
                value={this.state.email}
                handleUserEdit={this.handleUserEdit}
                stateKey={'email'} />,
            handleEmailChange: this.handleEmailChange,
            userEditIsVisible: this.state.userEditIsVisible.email,
            handleUserEditIsVisible: this.handleUserEditIsVisible,
          }} />
        </div>
      </Page>
    );
  }
}

type InputForUserType = {
  type: string,
  handleUserEdit: (KeyType, string) => void,
  stateKey: KeyType,
  value: string,
};

const InputForUser = ({
  type,
  handleUserEdit,
  stateKey,
  value,
}: InputForUserType): Node => (
  <input
    // $FlowFixMe
    onChange={(e: Event): void => handleUserEdit(stateKey, e.target.value)}
    type={type}
    value={value}
    className={formStyles.input}
    required />
);

type SelectCountryForUserType = {
  handleUserEdit: (KeyType, string) => void,
  stateKey: KeyType,
  value: string,
};

const SelectCountryForUser = ({
  handleUserEdit,
  stateKey,
  value,
}: SelectCountryForUserType): Node => (
    <select
      onChange={(e: Event): void =>// $FlowFixMe
        handleUserEdit(stateKey, e.target.value)
      }
      className={formStyles.select}
      defaultValue={value}
    >
    {
      Object.keys(countryJson).map((iso: string): Node => (
        <option key={iso} value={iso}>
          {countryJson[iso]}
        </option>
      ))
    }
  </select>
);

type EditFieldType = {
  label: string,
  value?: string,
  stateKey: KeyType,
  handleUserSubmission: (KeyType) => void,
  userEditIsVisible: boolean,
  handleUserEditIsVisible: (
    KeyType
  ) => void,
  editType: () => Node,
  t: TranslateType,
};

const EditUserField = ({
  label,
  value,
  stateKey,
  handleUserSubmission,
  userEditIsVisible,
  handleUserEditIsVisible,
  editType,
  t,
}: EditFieldType): Node => {
  return (
    <div className={styles.field}>
      <div className={styles.header}>
        {label}
        <button
          className={`${defaultStyles.link} ${styles.edit}`}
          onClick={(): void => handleUserEditIsVisible(stateKey)}
        >
          {t('edit')}
      </button>
      </div>
      <div className={styles.value}>
        {value && value}
      </div>
      {
        userEditIsVisible && (
          <form onSubmit={(e: Event) => {
            e.preventDefault();
            handleUserSubmission(stateKey);
          }}>
            <div className={formStyles.inline}>
              {
                editType()
              }
              <input
                className={formStyles.button}
                type="submit"
                value={t('confirm')}
              />
            </div>
          </form>
        )
      }
    </div>
  );
};

const mapStateToProps = (state: any): {status: ReduxStatusType} => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch: any): {confirmUserEdit: any} => ({
  confirmUserEdit: (key: string, value: string): any =>
    dispatch(changeUserDetails(key, value)),
  changeEmail: (email: string) => {
    dispatch(changeEmail(email));
  },
  cancelMessages: (): void => dispatch(removeMessages()),
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;

