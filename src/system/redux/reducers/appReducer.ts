import {AnyAction} from 'redux';
import {
  ADD_NEW_CATEGORY,
  APP_IDLE,
  APP_NAVIGATE,
  CATEGORY_UPDATE,
  FILTERED_SCREEN_SELECTED,
  ITEM_UPDATE,
  SET_APP_STATE,
} from '../actions/actionTypes';
import {AppState} from './interfaces/interfaces';

const initialState: AppState = {
  appName: '',
  actionComponent: '',
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
      const newInventory = [...state.inventory, {...action.payload.data}];

      return Object.assign({}, state, {
        inventory: newInventory,
        actionComponent: action.payload.actionComponent,
        actionState: ADD_NEW_CATEGORY,
      });
    }

    case FILTERED_SCREEN_SELECTED: {
      return Object.assign({}, state, {
        filteredScreen: action.payload.data,
        actionComponent: action.payload.actionComponent,
        actionState: FILTERED_SCREEN_SELECTED,
      });
    }

    case CATEGORY_UPDATE: {
      return Object.assign({}, state, {
        inventory: action.payload.data,
        actionComponent: action.payload.actionComponent,
        actionState: CATEGORY_UPDATE,
      });
    }

    case ITEM_UPDATE: {
      return Object.assign({}, state, {
        inventory: action.payload.data,
        actionComponent: action.payload.actionComponent,
        actionState: ITEM_UPDATE,
      });
    }

    case APP_IDLE: {
      return Object.assign({}, state, {
        actionState: APP_IDLE,
        actionComponent: action.payload.actionComponent,
      });
    }
    
    case APP_NAVIGATE: {
      return Object.assign({}, state, {
        actionState: APP_NAVIGATE,
        actionComponent: action.payload.actionComponent,
      });
    }

    

    default:
      return state;
  }
}
