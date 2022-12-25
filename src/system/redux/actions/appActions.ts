import {AppState} from '../reducers/interfaces/interfaces';

import {SET_APP_STATE} from './actionTypes';

export const setAppState = (obj: AppState) => ({
  type: SET_APP_STATE,
  payload: obj,
});
