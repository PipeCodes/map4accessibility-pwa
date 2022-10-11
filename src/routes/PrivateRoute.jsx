import React from 'react';
import { Redirect } from 'react-router';
import { isAuthenticated } from '../services/local';
import TrackedRoute from './TrackedRoute';

const PrivateRoute = ({ component: Component, routes, ...rest }) => (
  <TrackedRoute
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} routes={routes} />
      ) : (
        <Redirect to={routes.LOGIN.path} />
      )
    }
  />
);

export default PrivateRoute;
