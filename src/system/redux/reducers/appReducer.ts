import {AnyAction} from 'redux';
import {
  ADD_NEW_CATEGORY,
  APP_IDLE,
  CATEGORY_UPDATE,
  FILTERED_SCREEN_SELECTED,
  SET_APP_STATE,
} from '../actions/actionTypes';
import {AppState} from './interfaces/interfaces';

const initialState: AppState = {
  appName: '',
  actionState: 'IDLE',
  inventory: [],
  filteredScreen: {
    id: 0,
    categoryName: '',
    attributes: [],
  },
};

export default function appReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_APP_STATE: {
      return Object.assign({}, state, {
        appName: action.payload.appName,
      });
    }

    case ADD_NEW_CATEGORY: {
      const newInventory = [...state.inventory];
      newInventory.push(action.payload);

      return Object.assign({}, state, {
        inventory: newInventory,
        actionState: ADD_NEW_CATEGORY,
      });
    }

    case FILTERED_SCREEN_SELECTED: {
      return Object.assign({}, state, {
        filteredScreen: action.payload,
        actionState: FILTERED_SCREEN_SELECTED,
      });
    }

    case CATEGORY_UPDATE: {
      return Object.assign({}, state, {
        inventory: action.payload,
        actionState: CATEGORY_UPDATE,
      });
    }

    case APP_IDLE: {
      return Object.assign({}, state, {
        actionState: APP_IDLE,
      });
    }

    default:
      return state;
  }
}
