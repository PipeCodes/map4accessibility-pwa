import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import onboardingReducer from './reducers/onboarding';
import levelsReducer from './reducers/levels';
import faqsReducer from './reducers/faqs';
import authReducer from './reducers/auth';
import policyReducer from './reducers/policy';
import accessibilityReducer from './reducers/accessibility';
import placesReducer from './reducers/places';

export const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  levels: levelsReducer,
  faqs: faqsReducer,
  auth: authReducer,
  policy: policyReducer,
  accessibility: accessibilityReducer,
  places: placesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['accessibility', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);
export { store, persistor };
