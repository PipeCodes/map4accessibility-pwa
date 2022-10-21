import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import PolicyScreen from '../screens/PolicyScreen/PolicyScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen/RecoverPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import RegisterOptionsScreen from '../screens/RegisterOptionsScreen/RegisterOptionsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import RankingScreen from '../screens/RankingScreen/RankingScreen';
import AccessibilityScreen from '../screens/AccessibilityScreen/AccessibilityScreen';
import FAQsScreen from '../screens/FAQsScreen/FAQsScreen';
import TrackedRoute from './TrackedRoute';
import ChangePasswordScreen from '../screens/ChangePasswordScreen/ChangePasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import { isAuthenticated } from '../services/local';

const history = createBrowserHistory({ forceRefresh: true });

const routes = {
  ACCESSIBILITY: {
    path: '/accessibility',
    component: AccessibilityScreen,
    private: false,
  },
  POLICY: {
    path: '/policy',
    component: PolicyScreen,
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
  PROFILE: {
    path: '/profile',
    component: ProfileScreen,
    private: true,
  },
  EDIT_PROFILE: {
    path: '/edit-profile',
    component: EditProfileScreen,
    private: true,
  },
  RANKING: {
    path: '/ranking',
    component: RankingScreen,
    private: true,
  },
  FAQS: {
    path: '/faqs',
    component: FAQsScreen,
    private: false,
  },
  CHANGE_PASSWORD: {
    path: '/changepassword',
    component: ChangePasswordScreen,
    private: false,
  },
  DASHBOARD: {
    path: '/dashboard',
    component: OnboardingScreen, // Needs to change when we create a dashboard screen
    private: true,
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
