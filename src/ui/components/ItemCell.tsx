import {useNavigation, useTheme} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import {Button, Card, Switch, Text, TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {APP_DATA_TYPES} from '../../helper/enum';

export const ItemCell = ({
  item,
  itemIndex,
  onItemRemove,
  onAttributeValueUpdate,
  openDatePicker,
}) => {
  const navigation = useNavigation();
  // const {colors} = useTheme();
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const textCell = obj => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <View
          key={obj.id}
          style={{
            width: '85%',
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <TextInput
            style={{
              flex: 1,
              borderBottomColor: '#000000',
              borderBottomWidth: RFValue(0.5),
            }}
            label={obj.label}
            value={obj.value}
            keyboardType={'default'}
            onChangeText={text => {
              // item.categoryName = text;
              onAttributeValueUpdate(item.id, obj, text);
            }}
          />
        </View>
      </View>
    );
  };
  const numberCell = obj => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <View
          key={obj.id}
          style={{
            width: '85%',
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <TextInput
            style={{
              flex: 1,
              borderBottomColor: '#000000',
              borderBottomWidth: RFValue(0.5),
            }}
            label={obj.label}
            value={obj.value}
            keyboardType={'numeric'}
            onChangeText={text => {
              // item.categoryName = text;
              onAttributeValueUpdate(item.id, obj, text);
            }}
          />
        </View>
      </View>
    );
  };

  const checkBoxCell = obj => {
    return (
      <View
        style={{
          width: '100%',
          marginTop: RFValue(10),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Switch
          value={obj.boolValue}
          onValueChange={newValue => {
            onAttributeValueUpdate(item.id, obj, newValue);
          }}
        />

        <Text style={{marginLeft: RFValue(10)}}>{obj.label}</Text>
      </View>
    );
  };

  const dateCell = obj => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <View
          key={obj.id}
          style={{
            width: '85%',
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              // alignItems: 'flex-end',
              // flexDirection: 'row',
            }}
            onPress={() => {
              openDatePicker(item.id, obj);
            }}>
            <TextInput
              pointerEvents="none"
              disabled={true}
              style={{
                flex: 1,
                backgroundColor: '#00000000',
                borderBottomColor: '#000000',
                borderBottomWidth: RFValue(0.5),
              }}
              label={obj.label}
              value={obj.value}
              onChangeText={text => {
                // item.categoryName = text;
                // onAttributeValueUpdate(item.id, obj, text);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const titleAttribute = item.attributes.find(obj => obj.isTitle);
  let headingText = '';
  if (!!titleAttribute) {
    if (titleAttribute.type === APP_DATA_TYPES.CheckBox) {
      headingText = !!titleAttribute.label
      ? titleAttribute.label
      : 'Unnamed Field';
    } else {
      headingText =
      !!titleAttribute && !!titleAttribute.value
        ? titleAttribute.value
        : 'Unnamed Field';
    }
      
  }

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
            flex: 1,
            padding: RFValue(10),
            backgroundColor: colors.cellBackground,
          }}>
          <Text variant="titleMedium">{headingText}</Text>

          {!!item.attributes &&
            item.attributes.length > 0 &&
            item.attributes.map(obj => {
              switch (obj.type) {
                case APP_DATA_TYPES.String:
                  return textCell(obj);

                case APP_DATA_TYPES.Number:
                  return numberCell(obj);

                case APP_DATA_TYPES.CheckBox:
                  return checkBoxCell(obj);

                case APP_DATA_TYPES.Date:
                  return dateCell(obj);

                default:
                  return textCell(obj);
              }
            })}

          <View
            style={{
              flexDirection: 'row',
              marginTop: RFValue(10),
            }}>
            <Button
              icon="trash-can"
              style={{
                marginLeft: RFValue(10),
              }}
              mode="contained"
              textColor="#FFFFFF"
              onPress={() => {
                onItemRemove(item, itemIndex);
              }}>
              Remove
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
};
