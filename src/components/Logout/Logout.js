import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {logout} from '../../redux/actions/login-actions';

const Logout = withRouter(
  ({history, status, onClick}) => {
    return status.isLoggedIn
    ? (
      <button
        onClick={() => onClick()} >
        Sign out
      </button>
    ) : (
        <Link to="/login">Login</Link>
      );
  }
);

const mapStateToProps = (state) => ({
  status: state.status,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(logout()),
});

const LogoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

export default LogoutContainer;
