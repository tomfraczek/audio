// @flow
import React from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../redux/actions/login-actions';
import styles from './Header.module.css';
import translate from '../../config/text';
import type {TranslateType} from '../../types';
import logo from '../../assets/CA_anniversary_logo.svg';

type StatusType = {
  isLoggedIn: boolean,
  firstName: string,
  language: string,
};

const Header = ({
  status,
  logout,
}: {status: StatusType, logout: () => void}): Node => {
  const t = translate(status.language);
  return (
    <div className={styles.header}>
      <Link to="/courses" className={styles.logo}>
        <img src={logo} alt={`Cambridge audio ${t('title')}`} />
        &nbsp;{t('title')}
      </Link>
      <User
        isLoggedIn={status.isLoggedIn}
        firstName={status.firstName}
        logout={logout}
        t={t} />
    </div>
  );
};

type UserType = {
  isLoggedIn: boolean,
  firstName: string,
  logout: () => void,
  t: TranslateType,
};

const User = ({
  isLoggedIn,
  firstName,
  logout,
  t,
}: UserType): Node => (
  <div className={styles.user}>
    {
      isLoggedIn
        ? <LoggedIn t={t} firstName={firstName} logout={logout} />
        : <LoggedOut t={t} />
    }
  </div>
);

const LoggedOut = ({t}: {t: TranslateType}): Node => (
  <div>
    <Link className={styles.link} to="/register">{t('register')}</Link>
    <Link className={styles.link} to="/login">{t('signIn')}</Link>
  </div>
);

const LoggedIn = ({
  logout,
  firstName,
  t,
}: {logout: () => void, firstName: string, t: TranslateType}): Node => (
  <div className={styles.loggedIn}>
    <Link to="/profile">{firstName}&#39;s Profile</Link>
    <button className={styles.logout} onClick={(): void => logout()}>
      { t('signOut') }
    </button>
  </div>
);

const mapStateToProps = (state: any): any => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch: any): any => ({
  logout: (): void => dispatch(logout()),
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
