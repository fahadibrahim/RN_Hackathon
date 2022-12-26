import {ActionWithPayload, AppState} from '../reducers/interfaces/interfaces';

import {
  ADD_NEW_CATEGORY,
  APP_IDLE,
  CATEGORY_UPDATE,
  FILTERED_SCREEN_SELECTED,
  SET_APP_STATE,
} from './actionTypes';

export const setAppState = (obj: AppState) => ({
  type: SET_APP_STATE,
  payload: obj,
});

export const addNewCategoryAction = (obj: ActionWithPayload) => ({
  type: ADD_NEW_CATEGORY,
  payload: obj,
});

export const filteredScreenSelectedAction = (obj: ActionWithPayload) => ({
  type: FILTERED_SCREEN_SELECTED,
  payload: obj,
});

export const cacheUpdate = (obj: ActionWithPayload) => ({
  type: CATEGORY_UPDATE,
  payload: obj,
});

export const appIdle = (obj: ActionWithPayload) => ({
  type: APP_IDLE,
  payload: obj,
});
