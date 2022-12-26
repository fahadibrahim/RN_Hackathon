import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Divider, useTheme} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {h} from '../../helper/Dimensions';
// import {next_icon} from '../../../../assets/images';
// import {h} from '../../../../helper/Dimensions';
// import ListSeparator from '../../../Components/ListSeparator';

const NavItem = props => {
  const {onPress, title, isSelected} = props;
  const {colors} = useTheme();

  return (
    <React.Fragment>
      <TouchableOpacity
        style={[
          styles.row,
          {
            backgroundColor: isSelected
              ? colors.appSelectedNavItemColor
              : colors.appScreenBackground,
          },
        ]}
        onPress={onPress}>
        <Text
          style={[
            styles.row_text,
            {
              color: !!colors.appTextPrimary
                ? colors.appTextPrimary
                : '#000000',
            },
          ]}>
          {title}
        </Text>
        <Ionicons
          name={'chevron-forward-outline'}
          size={h(4)}
          color={'#000000'}
        />
      </TouchableOpacity>
      <Divider
        style={{
          backgroundColor: '#000000',
        }}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    paddingLeft: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: h(8),
    flexDirection: 'row',
    paddingRight: RFValue(20),
  },
  right_icon: {width: RFValue(15), height: RFValue(15), resizeMode: 'contain'},
  row_text: {
    // color: theme.WHITE_COLOR,
    color: '#FFFFFF',
    paddingHorizontal: RFValue(5),
    fontSize: RFValue(16),
    // fontWeight: theme.FONT_WEIGHT_MEDIUM,
    // fontFamily: theme.FONT_FAMILY
  },
});

export default NavItem;
