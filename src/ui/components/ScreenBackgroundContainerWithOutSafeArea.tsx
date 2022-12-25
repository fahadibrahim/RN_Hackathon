import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

const ScreenBackgroundContainerWithOutSafeArea = (props: any) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: !!colors.appScreenBackground
          ? colors.appScreenBackground
          : '#FFFFFF',
      }}>
      {props.children}
    </View>
  );
};

export default ScreenBackgroundContainerWithOutSafeArea;
