import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ScreenNames} from './ScreenNames';
import {Screens} from './Screens';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.SplashLoadingScreen}
        component={Screens.SplashLoadingScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={ScreenNames.DrawerNavigator}
        component={Screens.DrawerNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
