import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';

const TrackedRoute = (props) => {
  const { location } = props;

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    const page = location.pathname;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }, [location.pathname]);

  return <Route {...props} />;
};

export default TrackedRoute;
