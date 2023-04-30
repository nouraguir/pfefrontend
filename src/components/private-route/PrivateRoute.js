import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useAuth = () => {
  let user;
  const _user = localStorage.getItem("user");
  if (_user) {
    user = JSON.parse(_user);
    console.log("user", user);
  }
  if (user) {
    return {
      auth: true,
      role: user.role,
    };
  } else {
    return {
      auth: false,
      role: null,
    };
  }
};

const PrivateRoute = ({ component: Component, roleRequired, auth, ...rest }) => {
  const { role } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  if (roleRequired) {
    return isAuthenticated ? (
      roleRequired === role ? (
        <Route {...rest} component={Component} />
      ) : (
        <Redirect to="/denied" />
      )
    ) : (
      <Redirect to="/login" />
    );
  } else {
    return isAuthenticated ? <Route {...rest} component={Component} /> : <Redirect to="/login" />;
  }
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  auth: PropTypes.object.isRequired,
  roleRequired: PropTypes.oneOf(["ADMIN", "DEVELOPER", "OWNER"]),
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
