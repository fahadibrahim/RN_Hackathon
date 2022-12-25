import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

const AppBackgroundContainer = (props: any) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: !!colors.appBackground
          ? colors.appBackground
          : '#FFFFFF',
      }}>
      {props.children}
    </View>
  );
};

export default AppBackgroundContainer;
