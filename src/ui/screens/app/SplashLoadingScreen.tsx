import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {ScreenNames} from '../../../system/navigation/ScreenNames';
import ScreenBackgroundContainer from '../../components/ScreenBackgroundContainer';

const SplashLoadingScreen = () => {
  const navigation = useNavigation();
  // const dispatch = useAppDispatch();

  const {colors} = useTheme();

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }

    console.log('Done.');
  };

  useEffect(() => {
    clearAll();
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ScreenNames.DrawerNavigator as never,
            params: {},
          },
        ],
      });
    }, 500);
  }, []);

  return (
    <ScreenBackgroundContainer theme={colors}>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size="large"
            color={
              !!colors.appActivityIndicatorColor
                ? colors.appActivityIndicatorColor
                : '#000000'
            }
          />
        </View>
      </View>
    </ScreenBackgroundContainer>
  );
};

export default SplashLoadingScreen;
