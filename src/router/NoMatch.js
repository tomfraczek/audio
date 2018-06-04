// @flow
import React from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../containers/page/page';
import translate from '../config/text';
import {Link} from 'react-router-dom';

const NoMatch = ({language}: {language: string}): Node => {
  const t = translate(language);
  return (
    <Page title={t('title404')}>
      <p>{t('followToHome')}</p>
      <Link to='/'>{t('homePage')}</Link>
    </Page>
  );
};

const mapStateToProps = (state: any): {language: string} => ({
  language: state.status.language,
});

const NoMatchContainer = connect(
  mapStateToProps
)(NoMatch);

export default NoMatchContainer;
