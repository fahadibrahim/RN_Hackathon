// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {setAppState} from '../../../system/redux/actions/appActions';
import {useAppDispatch} from '../../../system/redux/store/hooks';
import ScreenBackgroundContainerWithOutSafeArea from '../../components/ScreenBackgroundContainerWithOutSafeArea';
// import AppStyles from '../../App/App.styles';

const DashboardScreen = ({route}) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  return (
    <ScreenBackgroundContainerWithOutSafeArea theme={colors}>
      <View style={{flex: 1}}>
        <Text>Dashboard</Text>

        <TouchableOpacity
          onPress={() => {
            dispatch(
              setAppState({
                appName: 'Fahad',
              }),
            );
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
