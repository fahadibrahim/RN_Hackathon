import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import AppDrawer from '../../ui/screens/drawer/AppDrawer';
import {ScreenNames} from './ScreenNames';
import {Screens} from './Screens';

export default function DrawerNavigator({navigation, route}) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.DashboardScreen}
      drawerContent={props => <AppDrawer {...props} />}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {
          // backgroundColor: '#c6cbef',
          // width: 75,
        },
      }}>
      <Drawer.Screen
        name={ScreenNames.DashboardScreen}
        component={Screens.DashboardScreen}
        options={{headerShown: true}}
        initialParams={route.params}
      />

      <Drawer.Screen
        name={ScreenNames.FilteredCategoriesScreen}
        component={Screens.FilteredCategoriesScreen}
        options={{headerShown: true}}
        initialParams={route.params}
      />

      <Drawer.Screen
        name={ScreenNames.ManageCategoriesScreen}
        component={Screens.ManageCategoriesScreen}
        options={{headerShown: true}}
        initialParams={route.params}
      />
    </Drawer.Navigator>
  );
}
