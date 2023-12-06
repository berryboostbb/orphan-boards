import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import userReducer from './reducers/userReducer';
import resetReducer from './reducers/resetReducer';
import reportReducer from './reducers/reportReducer';
import shopReducer from './reducers/shopReducer';
declare var window: any;

const reducers = combineReducers({
  user: userReducer,
  resetpassword:resetReducer,
  report:reportReducer,
  product:shopReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user','resetpassword'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware: any = getDefaultMiddleware({ serializableCheck: false });

let enhancedCompose = compose;

if (__DEV__) {
  enhancedCompose = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
}

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: enhancedCompose(middleware),
});

export const persistor = persistStore(store);
