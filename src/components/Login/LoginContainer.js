import {connect} from 'react-redux';
import Login from './Login';
import {loginIfNecessary} from '../../redux/actions/login-actions';
import {resetPassword} from '../../redux/actions/action-creators';

const mapStateToProps = (state) => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch) => ({
  attemptLogin: (loginParams) => dispatch(loginIfNecessary(loginParams)),
  resetPassword: (email) => dispatch(resetPassword(email)),
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
