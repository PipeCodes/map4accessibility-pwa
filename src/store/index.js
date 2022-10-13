import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import onboardingReducer from './reducers/onboarding';
import levelsReducer from './reducers/levels';
import faqsReducer from './reducers/faqs';
import rankingReducer from './reducers/ranking';
import authReducer from './reducers/auth';
import policyReducer from './reducers/policy';
import accessibilityReducer from './reducers/accessibility';

export const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  levels: levelsReducer,
  faqs: faqsReducer,
  ranking: rankingReducer,
  auth: authReducer,
  policy: policyReducer,
  accessibility: accessibilityReducer,
});

export default createStore(rootReducer, applyMiddleware(ReduxThunk));
