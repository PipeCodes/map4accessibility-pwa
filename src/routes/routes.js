import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen/RecoverPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import RegisterOptionsScreen from '../screens/RegisterOptionsScreen/RegisterOptionsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import RankingScreen from '../screens/RankingScreen/RankingScreen';
import AccessibilityScreen from '../screens/AccessibilityScreen/AccessibilityScreen';
import RoutePlannerScreen from '../screens/RoutePlannerScreen/RoutePlannerScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import TrackedRoute from './TrackedRoute';
import ChangePasswordScreen from '../screens/ChangePasswordScreen/ChangePasswordScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RatePlaceScreen from '../screens/RatePlaceScreen/RatePlaceScreen';
import AddPlaceScreen from '../screens/AddPlaceScreen/AddPlaceScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen/PlaceDetailsScreen';
import SingleRouteScreen from '../screens/SingleRouteScreen/SingleRouteScreen';
import InfoScreen from '../screens/InfoScreen/InfoScreen';
import WalkthroughScreen from '../screens/WalkthroughScreen/WalkthroughScreen';
import { isAuthenticated } from '../services/local';
import SearchScreen from '../screens/SearchScreen/SearchScreen';

const history = createBrowserHistory({ forceRefresh: true });

const routes = {
  ACCESSIBILITY: {
    path: '/accessibility',
    component: AccessibilityScreen,
    private: false,
  },
  LOGIN: { path: '/login', component: LoginScreen, private: false },
  RECOVER_PASSWORD: {
    path: '/recover-password',
    component: RecoverPasswordScreen,
    private: false,
  },
  REGISTER_OPTIONS: {
    path: '/register-options',
    component: RegisterOptionsScreen,
    private: false,
  },
  REGISTER: {
    path: '/register',
    component: RegisterScreen,
    private: false,
  },
  EMAIL_VALIDATION: {
    path: '/email-validation',
    component: InfoScreen,
    private: false,
  },
  WALKTHROUGH_TUTORIAL: {
    path: '/help',
    component: WalkthroughScreen,
    private: false,
  },
  EMAIL_CONFIRMATION: {
    path: '/email-confirmation',
    component: InfoScreen,
    private: false,
  },
  RESENT_CONFIRMATION: {
    path: '/confirmation-resent',
    component: InfoScreen,
    private: false,
  },
  RECOVER_EMAIL: {
    path: '/recover-email',
    component: InfoScreen,
    private: false,
  },
  PROFILE: {
    path: '/profile',
    component: ProfileScreen,
    private: false,
  },
  PLACE_RATE: {
    path: '/rate-place/:id/:google_place_id',
    component: RatePlaceScreen,
    private: false,
  },
  ADD_PLACE: {
    path: '/add-place/',
    component: AddPlaceScreen,
    private: false,
  },
  PLACE_DETAILS: {
    path: '/place-details/:id/:google_place_id',
    component: PlaceDetailsScreen,
    private: false,
  },
  ROUTE_PLANNER: {
    path: '/route-planner',
    component: RoutePlannerScreen,
    private: false,
  },
  SINGLE_ROUTE: {
    path: '/route/:id',
    component: SingleRouteScreen,
    private: false,
  },
  MAP: {
    path: '/map',
    component: MapScreen,
    private: false,
  },
  HOME: {
    path: '/home',
    component: HomeScreen,
    private: false,
  },
  RANKING: {
    path: '/ranking',
    component: RankingScreen,
    private: false,
  },
  CHANGE_PASSWORD: {
    path: '/change-password',
    component: ChangePasswordScreen,
    private: false,
  },
  SEARCH: {
    path: '/search',
    component: SearchScreen,
    private: false,
  },
};

const GlobalRoutes = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          isAuthenticated() ? <Redirect to="/home" /> : <Redirect to="/login" />
        }
      />
      {Object.values(routes).map((route) => {
        if (route.private) {
          return (
            <PrivateRoute
              key={route.path}
              exact
              path={route.path}
              routes={routes}
              component={route.component}
            />
          );
        }
        return (
          <TrackedRoute
            key={route.path}
            exact
            path={route.path}
            render={() => <route.component routes={routes} />}
          />
        );
      })}
    </Switch>
  </BrowserRouter>
);

export default GlobalRoutes;
