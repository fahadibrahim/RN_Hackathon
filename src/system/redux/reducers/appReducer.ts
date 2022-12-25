import {AnyAction} from 'redux';
import {SET_APP_STATE} from '../actions/actionTypes';
import {AppState} from './interfaces/interfaces';

const initialState: AppState = {
  appName: 'None',
  pushNotifications: false,
};

export default function appReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_APP_STATE: {
      return Object.assign({}, state, {
        appName: action.payload.appName,
        pushNotifications: true,
      });
    }

    default:
      return state;
  }
}
