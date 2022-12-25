import {useNavigation, useTheme} from '@react-navigation/native';
import {View} from 'react-native';
import {Button, Card, Text, TextInput} from 'react-native-paper';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {AllDataTypes} from '../../helper/enum';

export const CategoryCell = ({item, onValueUpdate, onAttributeAdded, onAttributeValueUpdate, onCategoryRemove}) => {
  const navigation = useNavigation();
  // const {colors} = useTheme();
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const textCell = obj => {
    return (
      <View
        key={obj.id}
        style={{
          width: RFValue(100),
          height: RFValue(100),
          backgroundColor: '#998899',
        }}>
          <TextInput
            label="Field"
            value={obj.value}
            onChangeText={text => {
              // item.categoryName = text;
              onAttributeValueUpdate(obj, text);
            }}
          />
        </View>
    );
  };

  const numberCell = obj => {
    return (
      <View
        key={obj.id}
        style={{
          width: RFValue(100),
          height: RFValue(100),
          backgroundColor: '#998899',
        }}></View>
    );
  };

  return (
    <View
      style={{
        // justifyContent: "center",
        width: '100%',
        padding: RFValue(10),
      }}>
      <Card>
        <View
          style={{
            elevation: 900,
            flex: 1,
            padding: RFValue(10),
            backgroundColor: colors.cellBackground,
          }}>
          <Text variant="titleMedium">{item.categoryName}</Text>

          <TextInput
            label="Category Name"
            value={item.categoryName}
            onChangeText={text => {
              // item.categoryName = text;
              onValueUpdate(text);
            }}
          />

          {!!item.attributes &&
            item.attributes.length > 0 &&
            item.attributes.map(obj => {
              if (item.label === 'tabs') {
                return textCell(obj);
              } else if (item.label === 'about') {
                return numberCell(obj);
              } else {
                return textCell(obj);
              }
            })}

          <View
            style={{
              flexDirection: 'row',
            }}>
            <Menu>
              <MenuTrigger>
                <Button mode="contained" textColor="#FFFFFF">
                  Add New Field
                </Button>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  backdrop: {
                    width: RFValue(300),
                  },
                  optionWrapper: {padding: 5},
                  optionText: {fontSize: RFValue(13)},
                }}>
                {AllDataTypes.map((opt, i) => {
                  return (
                    <MenuOption
                      key={i}
                      style={{
                        width: RFValue(150),
                        borderBottomWidth: RFValue(1),
                        padding: 10,
                        backgroundColor: '#FFFFFF',
                      }}
                      onSelect={() => {
                        onAttributeAdded(opt);
                      }}>
                      <Text
                        style={{
                          color: colors.black,
                          fontSize: 20,
                        }}>
                        {opt}
                      </Text>
                    </MenuOption>
                  );
                })}
              </MenuOptions>
            </Menu>

            <Button
              icon="trash-can"
              style={{
                marginLeft: RFValue(10),
              }}
              mode="contained"
              textColor="#FFFFFF"
              onPress={() => {
                onCategoryRemove(item);
              }}>
              Remove
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
};
