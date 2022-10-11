import React from 'react';
import { Navigate } from 'react-router';
import { isAuthenticated } from '../services/local';
import TrackedRoute from './TrackedRoute';

const PrivateRoute = ({ component: Component, routes, ...rest }) => (
  <TrackedRoute
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} routes={routes} />
      ) : (
        <Navigate to={routes.LOGIN.path} />
      )
    }
  />
);

export default PrivateRoute;
