import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-paper';
import {ScreenNames} from '../../../system/navigation/ScreenNames';
import {appNavigate, filteredScreenSelectedAction} from '../../../system/redux/actions/appActions';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../system/redux/store/hooks';
import NavItem from '../../components/NavItem';

import ScreenBackgroundContainerWithOutSafeArea from '../../components/ScreenBackgroundContainerWithOutSafeArea';

const AppDrawer = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {colors} = useTheme();
  const [currentScreen, setCurrentScreen] = useState(
    ScreenNames.DashboardScreen,
  );
  const inventory = useAppSelector(state => state.app.inventory);
  const filteredScreen = useAppSelector(state => state.app.filteredScreen);

  // let currentRouteName = props.state.routeNames[props.state.index];

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 0,
        paddingTop: 0,
      }}>
      <ScreenBackgroundContainerWithOutSafeArea theme={colors}>
        <DrawerContentScrollView
          style={
            {
              // backgroundColor: colors.appPrimary,
            }
          }>
          <View
            style={{
              flex: 1,
            }}>
            <Divider
              style={{
                backgroundColor: '#000000',
              }}
            />

            <NavItem
              title="Dashboard"
              isSelected={currentScreen === ScreenNames.DashboardScreen}
              onPress={() => {
                setCurrentScreen(ScreenNames.DashboardScreen);
                navigation.navigate(
                  ScreenNames.DashboardScreen as never,
                  {} as never,
                );

                props.navigation.closeDrawer();
              }}
            />
            {!!inventory &&
              inventory.length > 0 &&
              inventory.map((item: Machines) => (
                <View key={item.structure.id}>
                  <NavItem
                    title={item.structure.categoryName}
                    isSelected={
                      currentScreen === item.structure.categoryName &&
                      filteredScreen.id === item.structure.id
                    }
                    onPress={() => {
                      setCurrentScreen(item.structure.categoryName);

                      dispatch(
                        filteredScreenSelectedAction({
                          data: item.structure,
                          actionComponent: ScreenNames.FilteredCategoriesScreen,
                        }),
                      );

                      navigation.navigate(
                        ScreenNames.FilteredCategoriesScreen as never,
                        {
                          headerTitle: filteredScreen.categoryName,
                        } as never,
                      );

                      props.navigation.closeDrawer();
                    }}
                  />
                </View>
              ))}

            <NavItem
              title="Manage Categories"
              isSelected={currentScreen === ScreenNames.ManageCategoriesScreen}
              onPress={() => {
                setCurrentScreen(ScreenNames.ManageCategoriesScreen);
                navigation.navigate(
                  ScreenNames.ManageCategoriesScreen as never,
                  {} as never,
                );

                props.navigation.closeDrawer();
              }}
            />
          </View>
        </DrawerContentScrollView>
      </ScreenBackgroundContainerWithOutSafeArea>
    </View>
  );
};

export default AppDrawer;
