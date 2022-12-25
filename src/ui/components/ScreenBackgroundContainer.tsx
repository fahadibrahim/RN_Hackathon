import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScreenBackgroundContainer = (props: any) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: !!colors.appScreenBackground
            ? colors.appScreenBackground
            : '#FFFFFF',
        }}>
        {props.children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenBackgroundContainer;
