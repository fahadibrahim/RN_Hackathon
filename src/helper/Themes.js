// import { DefaultTheme } from "react-native-paper";
import {DefaultTheme} from '@react-navigation/native';
import DarkColors from './DarkColors';
import LightColors from './LightColors';

export const LightTheme = {
  ...DefaultTheme,
  dark: false,

  colors: {
    ...DefaultTheme.colors,

    appPrimary: LightColors.APP_PRIMARY,

    appBackground: LightColors.APP_BACKGROUND_COLOR,
    appScreenBackground: LightColors.APP_SCREEN_BACKGROUND_COLOR,

    appActivityIndicatorColor: LightColors.APP_ACTIVITY_INDICATOR_COLOR,
    appSelectedNavItemColor: LightColors.APP_NAV_SELECTION_COLOR,

    appTextPrimary: LightColors.TEXT.PRIMARY,

    cellBackground: LightColors.CELL.BACKGROUND,
  },
};

export const DarkTheme = {
  ...DefaultTheme,
  dark: true,

  colors: {
    ...DefaultTheme.colors,

    appPrimary: DarkColors.APP_PRIMARY,

    appBackground: DarkColors.APP_BACKGROUND_COLOR,
    appScreenBackground: DarkColors.APP_SCREEN_BACKGROUND_COLOR,

    appActivityIndicatorColor: DarkColors.APP_ACTIVITY_INDICATOR_COLOR,
    appSelectedNavItemColor: DarkColors.APP_NAV_SELECTION_COLOR,

    appTextPrimary: DarkColors.TEXT.PRIMARY,

    cellBackground: DarkColors.CELL.BACKGROUND,
  },
};
