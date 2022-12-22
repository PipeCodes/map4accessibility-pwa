import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import questionsReducer from './reducers/questions';
import authReducer from './reducers/auth';
import accessibilityReducer from './reducers/accessibility';
import placesRankingReducer from './reducers/placesRanking';
import placeEvaluationsReducer from './reducers/placeEvaluations';
import placeReducer from './reducers/place';
import directionsReducer from './reducers/directions';

export const rootReducer = combineReducers({
  questions: questionsReducer,
  auth: authReducer,
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
