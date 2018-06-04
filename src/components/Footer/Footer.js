// @flow
import React from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import translate from '../../config/text';
import styles from './Footer.module.css';

const languageTitle = ['English', 'Deutsche', 'Français', 'Español'];
const pickLanguageTitle = (language: string): string => {
  switch (language) {
    case 'en':
      return languageTitle[0];
    case 'de':
      return languageTitle[1];
    case 'fr':
      return languageTitle[2];
    case 'es':
      return languageTitle[3];
    default:
      return ' ';
  }
};
const Footer = ({language}: {language: string}): Node => {
  const t = translate(language);
  return (
    <div className={styles.footer}>
      {pickLanguageTitle(language)} - <Link to={'/language'}>{t('changeLanguage')}</Link>
    </div>
  );
};

const mapStateToProps = (state: any): any => ({
  language: state.status.language,
});

const FooterContainer = connect(
  mapStateToProps,
)(Footer);

export default FooterContainer;
