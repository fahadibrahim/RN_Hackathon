import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch} from '../../../system/redux/store/hooks';
import ScreenBackgroundContainerWithOutSafeArea from '../../components/ScreenBackgroundContainerWithOutSafeArea';
// import AppStyles from '../../App/App.styles';

const DashboardScreen = ({route}) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Dashboard',
    });
  }, []);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log('Done.');
  };

  return (
    <ScreenBackgroundContainerWithOutSafeArea theme={colors}>
      <View style={{flex: 1}}>
        <Text>Dashboard</Text>

        <TouchableOpacity
          onPress={() => {
            clearAll();

            // dispatch(
            //   setAppState({
            //     appName: 'Fahad',
            //   }),
            // );
          }}>
          <Text>Hello</Text>
        </TouchableOpacity>

        {/* <FullScreenSpinner
          loading={false}
          title={'Please wait...'}
        /> */}
      </View>
    </ScreenBackgroundContainerWithOutSafeArea>
  );
};

export default DashboardScreen;
