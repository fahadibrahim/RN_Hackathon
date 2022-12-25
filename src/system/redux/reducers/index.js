import { combineReducers } from 'redux';
import { appSlice } from '../splice/appSlice';
import appReducer from './appReducer';


const rootReducer = combineReducers({
  app: appReducer,
  appSlice: appSlice,
});

export default rootReducer;
