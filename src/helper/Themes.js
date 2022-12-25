// import { DefaultTheme } from "react-native-paper";
import {DefaultTheme} from '@react-navigation/native';
import DarkColors from './DarkColors';
import LightColors from './LightColors';

export const LightTheme = {
  ...DefaultTheme,
  dark: false,

  colors: {
    ...DefaultTheme.colors,

    appBackground: LightColors.APP_BACKGROUND_COLOR,
    appScreenBackground: LightColors.APP_SCREEN_BACKGROUND_COLOR,

    appActivityIndicatorColor: LightColors.APP_ACTIVITY_INDICATOR_COLOR,
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  dark: true,

  colors: {
    ...DefaultTheme.colors,

    appBackground: DarkColors.APP_BACKGROUND_COLOR,
    appScreenBackground: DarkColors.APP_SCREEN_BACKGROUND_COLOR,

    appActivityIndicatorColor: DarkColors.APP_ACTIVITY_INDICATOR_COLOR,
  },
};
