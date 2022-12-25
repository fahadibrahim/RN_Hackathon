// // import {configureStore, createStore} from '@reduxjs/toolkit';
// import logger from 'redux-logger';
// // import appReducer from '../reducers/appReducer';
// // import authReducer from '../reducers/authReducer';
// // import dockCheckInReducer from '../reducers/dockCheckInReducer';
// // import {appSlice} from '../splice/appSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import storage from 'redux-persist/lib/storage';

// import {applyMiddleware, createStore} from 'redux';
// import {persistReducer, persistStore} from 'redux-persist';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

// // ...

// const middlewares: any[] = [
//   /* other middlewares */
//   logger,
//   thunk,
// ];

// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middlewares.push(createDebugger());
// }

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default () => {
//   let store = createStore(persistedReducer, applyMiddleware(...middlewares));
//   let persistor = persistStore(store);
//   return {store, persistor};
// };

// export const store = createStore(RootReducer, applyMiddleware(...middlewares));

// export const store = configureStore({
//   reducer: {
//     myApp: appSlice.reducer,
//     app: appReducer,
//     auth: authReducer,
//     driver: dockCheckInReducer,
//   },

//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       immutableCheck: {warnAfter: 500},
//       serializableCheck: {warnAfter: 500},
//     }).concat(middlewares),
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// import {persistReducer, persistStore} from 'redux-persist';
// // import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const persistConfig = {
//   key: 'root',
//   AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default () => {
//   let store = createStore(persistedReducer);
//   let persistor = persistStore(store);
//   return {store, persistor};
// };

// src/redux/store.js
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
// import userReducer from "./slices/userSlice";
// import {appSlice} from '../splice/appSlice';

import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);
