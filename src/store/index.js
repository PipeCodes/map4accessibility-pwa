import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['accessibility'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);
export { store, persistor };
