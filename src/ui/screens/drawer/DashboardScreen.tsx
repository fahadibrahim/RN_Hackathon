// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import ScreenBackgroundContainerWithOutSafeArea from '../../components/ScreenBackgroundContainerWithOutSafeArea';
// import AppStyles from '../../App/App.styles';

const DashboardScreen = ({route}) => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  return (
    <ScreenBackgroundContainerWithOutSafeArea theme={colors}>
      <View style={{flex: 1}}>
        <Text>Dashboard</Text>

        {/* <FullScreenSpinner
          loading={false}
          title={'Please wait...'}
        /> */}
      </View>
    </ScreenBackgroundContainerWithOutSafeArea>
  );
};

export default DashboardScreen;
