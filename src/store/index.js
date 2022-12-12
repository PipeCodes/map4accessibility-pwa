import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import onboardingReducer from './reducers/onboarding';
import levelsReducer from './reducers/levels';
import questionsReducer from './reducers/questions';
import authReducer from './reducers/auth';
import policyReducer from './reducers/policy';
import accessibilityReducer from './reducers/accessibility';
import placesRankingReducer from './reducers/placesRanking';
import placeEvaluationsReducer from './reducers/placeEvaluations';
import directionsReducer from './reducers/directions';
import placeReducer from './reducers/place';

export const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  levels: levelsReducer,
  questions: questionsReducer,
  auth: authReducer,
  policy: policyReducer,
  accessibility: accessibilityReducer,
  placesRanking: placesRankingReducer,
  placeEvaluations: placeEvaluationsReducer,
  place: placeReducer,
  directions: directionsReducer,
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
