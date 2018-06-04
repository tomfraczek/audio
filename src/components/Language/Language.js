// @flow
import React, {Component} from 'react';
import type {Node} from 'react';
import {connect} from 'react-redux';
import Page from '../../containers/page/page';
import {changeLanguageIfNecessary} from '../../redux/actions/action-creators';
import translate from '../../config/text';
import type {TranslateType} from '../../types';
import styles from './Language.module.css';

type PropsType = {
  language: string,
  changeLanguage: string => void,
};

type StateType = {
  currentLang: string,
};

class Language extends Component<PropsType, StateType> {
  languages: Array<{
    lang: string,
    iso: string,
  }>
  t: TranslateType
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentLang: this.props.language,
    };
    this.t = translate(this.state.currentLang);
    this.languages = [
      {
        lang: 'english',
        iso: 'en',
      },
      {
        lang: 'german',
        iso: 'de',
      },
    ];
  }
  handleClick() {
    this.props.changeLanguage(this.state.currentLang);
    this.t = translate(this.state.currentLang);
  }
  switchLanguage = (iso: string) => {
    this.setState({
      currentLang: iso,
    });
  }
  render(): * {
    return (
      <Page title={this.t('changeLanguage')}>
        <div className={styles.content}>
          <h4>{translate(this.state.currentLang)('chooseLanguage')}:</h4>
          <div className={styles.languages}>
            {
              this.languages.map(({
                lang, iso,
              }: {lang: string, iso: string},
                i: number
              ): Node => (
                <LanguageButton
                  key={i}
                  switchLanguage={this.switchLanguage}
                  lang={lang}
                  currentLang={this.state.currentLang}
                  iso={iso}
                  t={translate(this.state.currentLang)} />
              ))
            }
          </div>
          <div className={styles.confirm}>
            {
              this.state.currentLang !== this.props.language
              ? <div className={styles.help}>{
                translate(this.state.currentLang)('languageHelp')
                }</div>
              : ''
            }
            <button onClick={(): void => this.handleClick()}>
              {translate(this.state.currentLang)('confirm')}
            </button>
          </div>
        </div>
      </Page>
    );
  }
}

type LanguageButtonType = {
  lang: string,
  iso: string,
  switchLanguage: string => void,
  t: TranslateType,
  currentLang: string,
};

const LanguageButton = ({
  lang,
  iso,
  switchLanguage,
  t,
  currentLang,
}: LanguageButtonType): Node => (
  <button
    className={styles[iso === currentLang ? 'current' : 'notCurrent']}
    onClick={(e: Event): void => switchLanguage(iso)}>
    {t(lang)}
  </button>
);

const mapStateToProps = (state: any): {language: string} => ({
  language: state.status.language,
});

const mapDispatchToProps = (dispatch: any): any => ({
  changeLanguage: (
    language: string
  ): void => dispatch(changeLanguageIfNecessary(language)),
});

const LanguageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Language);

export default LanguageContainer;
