import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '../reducers/interfaces/interfaces';

// Define the initial state using that type

const initialState: AppState = {
  appName: 'None',
  pushNotifications: false,
};

export const appSlice = createSlice({
  name: 'fahadSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    auto: state => {
      state.appName = 'My App';
    },
    VenueGPS: state => {
      state.appName = 'VENUE GPS';
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setByParams: (state, action: PayloadAction<AppState>) => {
      state.appName = action.payload.appName;
      state.pushNotifications = action.payload.pushNotifications;
    },
  },
});

export const {auto, VenueGPS, setByParams} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectAppName = (state: RootState) => state.app.appName

// export default appSlice.reducer
