import {ActionWithPayload, AppState} from '../reducers/interfaces/interfaces';

import {
  ADD_NEW_CATEGORY,
  APP_IDLE,
  APP_NAVIGATE,
  CATEGORY_UPDATE,
  FILTERED_SCREEN_SELECTED,
  ITEM_UPDATE,
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

export const itemUpdate = (obj: ActionWithPayload) => ({
  type: ITEM_UPDATE,
  payload: obj,
});

export const categoryUpdate = (obj: ActionWithPayload) => ({
  type: CATEGORY_UPDATE,
  payload: obj,
});

export const appIdle = (obj: ActionWithPayload) => ({
  type: APP_IDLE,
  payload: obj,
});

export const appNavigate = (obj: ActionWithPayload) => ({
  type: APP_NAVIGATE,
  payload: obj,
});
