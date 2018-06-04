// @flow
/**
 * This loads the entire project,
 * it should do as LITTLE as possible
 */
import React, {Component} from 'react';
import type {Node} from 'react';
import Routes from './router/routes.js';
import configureStore from './redux/store/configureStore.js';
import {database} from './firebase/';
import type {
  MultiChoiceType,
  CourseType,
  LessonType,
  ModuleType,
} from './types.js';
import {LOGIN} from './redux/actions/action-types';
import {
  getFromLocalStorage,
} from './utility/utility';
import {Loading} from './components';

type ResourcesType = {
  assessments: {} | MultiChoiceType,
  courses: {} | CourseType,
  components: {} | LessonType | MultiChoiceType,
  modules: {} | ModuleType,
};

type StateType = {
  loaded: boolean,
  preLoadedState: ?{} | typeof undefined,
};

class App extends Component<void, StateType> {
  resources: {} | ResourcesType;
  constructor() {
    super();
    this.state = {
      loaded: false,
      preLoadedState: undefined,
    };
    this.resources = {};
  }

  componentDidMount() {
    const userIdIfLoggedInAtLoad = getFromLocalStorage(LOGIN.SUCCESS);
    if (userIdIfLoggedInAtLoad) {
      this.loadUser(userIdIfLoggedInAtLoad);
    } else {
      this.noUser();
    }
  }

  loadUser(userId: string) {
    database.ref('/users/' + userId)
      .once('value')
      .then((res: {val: any}): {} => res.val())
      .then((state: any) => {
        this.setState({
          preLoadedState: state,
          loaded: true,
        });
      });
  }

  noUser() {
    this.setState({
      loaded: true,
    });
  }

  render(): Node {
    if (!this.state.loaded) {
      return <Loading text={'Loading Cambridge Audio | Learn'} />;
    }
    return (
      <Routes
        resources={this.resources}
        store={configureStore(this.state.preLoadedState)} />
    );
  }
}

export default App;
