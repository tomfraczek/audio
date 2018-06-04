import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {
  CoursesContainer,
  CourseContainer,
  ModuleContainer,
  AssessmentContainer,
  LoginContainer,
  RegisterContainer,
  LanguageContainer,
  ProfileContainer,
} from '../components/index.js';
import NoMatchContainer from './NoMatch';
import {loginSuccess} from '../redux/actions/login-actions';
import {
  downloadResourcesInPreferredLanguage,
} from '../redux/actions/resources-actions';


const ValidateModulePath = ({route, resources}) => {
  // courseId is irrelevant to rendering Module, so we check
  // Course actually contains Module, else redirect to Module
  const {courseId, moduleId} = route.match.params;
  if (resources.courses[courseId].field_modules.some((module) => {
    return Number(module.target_id) === Number(moduleId);
  })) {
    return <ModuleContainer route={route} resources={resources} />;
  }
  return <Redirect to={`/course/${courseId}`} />;
};

// TODO: extract this to a new file
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      const {status} = rest;
      return status.isLoggedIn
        ? <Component {...props} />
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: props.location},
            }}
          />
        );
    }}
  />
);

const mapStateToProps = (state) => ({
  status: state.status,
});

const PrivateRouteContainer = connect(
  mapStateToProps
)(PrivateRoute);

const Routes = ({resources, store}) => {
  const state = store.getState();
  if (state.status.isLoggedIn) {
    store.dispatch(loginSuccess({
      email: state.status.email,
      id: state.status.id,
    }));
    store.dispatch(downloadResourcesInPreferredLanguage());
  }
  return (
    <Provider store={store}>
      <Router basename={`${process.env.PUBLIC_URL}/`}>
        <Switch>
          <PrivateRouteContainer
            path={`/courses`}
            exact component={() => (
              <CoursesContainer />
            )} />
          <PrivateRouteContainer
            path={`/course/:courseId/assessment`}
            component={(route) => (
              <AssessmentContainer route={route} />
            )} />
          <PrivateRouteContainer
            path={`/course/:courseId/:moduleId`}
            component={(route) => (
              <ModuleContainer route={route} />
            )} />
          <PrivateRouteContainer
            path={`/course/:courseId`}
            component={(route) => (
              <CourseContainer route={route} />
            )} />
          <PrivateRouteContainer
            path={`/profile`}
            component={(route) => (
              <ProfileContainer route={route} />
            )} />
          <Route exact path={`/`} component={() => {
            return <Redirect to='/courses' />;
          }} />
          <Route exact path={`/register`} component={RegisterContainer} />
          <Route path={`/login`} component={LoginContainer} />
          <Route path={`/language`} component={LanguageContainer} />
          <Route component={NoMatchContainer}></Route>
        </Switch>
      </Router>
    </Provider>
  );
};

Routes.propTypes = {
  resources: PropTypes.object,
  store: PropTypes.object,
};

ValidateModulePath.propTypes = {
  resources: PropTypes.object,
  route: PropTypes.object,
};

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func,
};

export default Routes;
