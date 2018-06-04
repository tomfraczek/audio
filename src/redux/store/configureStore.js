import {createStore, applyMiddleware} from 'redux';
// import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/reducers.js';
import {database} from '../../firebase';

// Logs Redux actions
// const loggerMiddleware = createLogger();

const logStateToDatabaseIfSignedIn = (state) => {
  if (state.status.isLoggedIn) {
    return database.ref('users/' + state.status.id)
      .set(cleanseSavedState(state));
  }
};

const cleanseSavedState = ({
  status,
  assessmentStatuses,
  coursesStatuses,
  moduleProgression,
}) => {
  return Object.assign({}, {
    status,
    assessmentStatuses,
    coursesStatuses,
    moduleProgression,
  });
};

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  );
  // see "Hot reloading reducers is now explicit":
  // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducers.js', () => {
      const nextRootReducer = require('../reducers/reducers.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  // add subscription
  // Anytime redux is updated, this gets the state
  // State then gets posted to firebase of whereever
  store.subscribe(() => logStateToDatabaseIfSignedIn(store.getState()));
  return store;
};

export default configureStore;
