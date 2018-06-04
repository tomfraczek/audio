// @flow
/**
 * Shows a Multiple-Choice Question
 */
import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import type {Node} from 'react';
import {once as myOnce, shuffle} from '../../utility/utility.js';
import styles from './Multiple-Choice.module.css';
import defaultStyles from '../../styles/default.module.css';
import type {TranslateType} from '../../types';

type PropsType = {
  field_question: Array<{
    value: string,
  }>,
  field_correct_choice: Array<{
    value: string,
  }>,
  field_incorrect_choices: Array<{
    value: string,
  }>,
  t: TranslateType,
};

type StateType = {
  clicked: boolean,
  isCorrectChoice: string,
};

/**
 * Will need to add state to this
 * Add click handler
 * If correct choice is clicked
 * pass callback to enable 'Next' button to be pressed
 */
export class MultipleChoice extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    // state is maintained between all questions...
    this.state = {
      clicked: false,
      isCorrectChoice: '',
    };
  }

  shuffleOnce = myOnce((children: Array<Node>): Array<Node> => {
    return shuffle(children);
  })
  // property initializer syntax
  // https://github.com/facebook/flow/issues/5874#issuecomment-369922816
  handleClick = (isCorrect: boolean) => {
    if (!this.state.clicked) {
      this.setState({
        clicked: true,
        isCorrectChoice: isCorrect ? 'Correct' : 'Incorrect',
      });
    }
  }
  render(): Node {
    return (
      <MultipleChoicePresentation
        field_question={this.props.field_question}
        field_correct_choice={this.props.field_correct_choice}
        field_incorrect_choices={this.props.field_incorrect_choices}
        handleClick={this.handleClick}
        state={this.state}
        shuffleOnce={this.shuffleOnce}
        t={this.props.t} />
    );
  }
}

type MultipleChoicePresentationType = {
  field_question: Array<{
    value: string,
  }>,
  field_correct_choice: Array<{
    value: string,
  }>,
  field_incorrect_choices: Array<{
    value: string,
  }>,
  handleClick: boolean => void,
  state: StateType,
  shuffleOnce: (Array<Node>) => Array<Node>,
  t: TranslateType,
};

const MultipleChoicePresentation = ({
  field_question,
  field_correct_choice,
  field_incorrect_choices,
  handleClick,
  state,
  shuffleOnce,
  t,
}: MultipleChoicePresentationType): Node => (
  <div className="multiple-question">
    <div className="question">
      <h3>{field_question[0].value}</h3>
    </div>
    <div className={
      `${styles.choices} ${state.clicked ? styles.choicesChosen : ''}`
      }>
      <MultipleChoiceList choices={[
          field_correct_choice[0],
          ...field_incorrect_choices,
        ]}
        handleClick={handleClick}
        clicked={state.clicked}
        shuffleOnce={shuffleOnce} />
    </div>
    <div className="choice">
      {
        state.clicked && (
            <div className={
              state.isCorrectChoice === 'Correct'
                ? defaultStyles.success
                : defaultStyles.errors
            }>
              {state.isCorrectChoice} – {field_correct_choice[0].value}
          </div>
        )
      }
    </div>
  </div>
);

type MultipleChoiceListType = {
  choices: Array<{
    value: string,
  }>,
  handleClick: boolean => void,
  clicked: boolean,
  shuffleOnce: (Array<Node>) => Array<Node>,
};

const MultipleChoiceList = ({
  choices,
  handleClick,
  clicked,
  shuffleOnce,
}: MultipleChoiceListType ): Array<Node> => (
  shuffleOnce(choices.map((
    choice: {
      value: string,
    },
    i: number
  ): Node => {
    return <Choice
      key={i}
      text={choice.value}
      isCorrect={i === 0 ? true : false}
      clicked={ clicked }
      handleClick={handleClick} />;
  }))
);

type ChoiceType = {
  text: string,
  isCorrect: boolean,
  handleClick: boolean => void,
  clicked: boolean,
};

class Choice extends Component<ChoiceType, {domIndex: string}> {
  el: string
  constructor(props: ChoiceType) {
    super(props);
    this.el = '';
    this.state = {
      domIndex: 'not set',
    };
  }
  getIndex = (el: Node): number => {
    if (el) {
      let i = 0;
      // $FlowFixMe
      while ((el = el.previousSibling) != null) {
        i++;
      }
      return i;
    }
    return 0;
  };
  componentDidMount() {
    if (this.el) {
      this.setState({
        domIndex: String.fromCharCode(
          97 + this.getIndex(this.el)
        ).toUpperCase() + '. ',
      });
    }
  }
  render(): * {
    return (
      <div
        // $FlowFixME
        ref={(div: any): * => {
          this.el = div;
        }}
        className={styles.choice}
        onClick={(): void => this.props.handleClick(this.props.isCorrect)}
      >
        <div className={styles.index}>
          {this.state.domIndex}
        </div>
        <div className={styles.answer}>
          {this.props.text}
        </div>
        <div className={styles.icon}>
          {this.props.isCorrect ? '✅' : '❎'}
        </div>
      </div>
    );
  }
}
