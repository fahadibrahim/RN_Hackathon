import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
// import {w} from '../../helper/Dimensions';
// import AppDrawer from '../../ui/Screens/Home/Dashboard/AppDrawer';
import {ScreenNames} from './ScreenNames';
import {Screens} from './Screens';


export default function DrawerNavigator({navigation, route}) {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.DashboardScreen}
      // drawerContent={props => <AppDrawer {...props} />}
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
    </Drawer.Navigator>
  );
}
