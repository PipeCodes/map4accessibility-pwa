import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import PolicyScreen from '../screens/PolicyScreen/PolicyScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen/RecoverPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import RankingScreen from '../screens/RankingScreen/RankingScreen';
import FAQsScreen from '../screens/FAQsScreen/FAQsScreen';
import TrackedRoute from './TrackedRoute';
import ChangePasswordScreen from '../screens/ChangePasswordScreen/ChangePasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';

const routes = {
  WELCOME: { path: '/', component: WelcomeScreen, private: false },
  ONBOARDING: {
    path: '/onboarding',
    component: OnboardingScreen,
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
};

const GlobalRoutes = () => (
  <BrowserRouter>
    <Switch>
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
