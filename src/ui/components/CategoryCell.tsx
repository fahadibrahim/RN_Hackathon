import {useNavigation, useTheme} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import {Button, Card, Text, TextInput} from 'react-native-paper';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {RFValue} from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {AllDataTypes} from '../../helper/enum';

export const CategoryCell = ({
  item,
  onValueUpdate,
  onAttributeAdded,
  onAttributeValueUpdate,
  onCategoryRemove,
  onAttributeRemoved,
  onTitleAttributeSelection,
}) => {
  const navigation = useNavigation();
  // const {colors} = useTheme();
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const attributeCell = obj => {
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
            label="Field"
            value={obj.value}
            onChangeText={text => {
              // item.categoryName = text;
              onAttributeValueUpdate(obj, text);
            }}
          />
          <Text
            style={{
              borderRadius: RFValue(10),
              borderWidth: RFValue(0.5),
              padding: RFValue(5),
              marginLeft: RFValue(10),
              marginBottom: RFValue(5),
            }}>
            {obj.type}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: RFValue(5),
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              onAttributeRemoved(obj);
            }}>
            <Ionicons
              name={'trash-outline'}
              size={RFValue(20)}
              color={'#000000'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const titleAttribute = item.attributes.find(obj => obj.isTitle);
  const titleAttributeText = !!titleAttribute
    ? 'Title Field: ' + titleAttribute.value
    : 'Title Field: - ';

  console.log('Fahad att: ', titleAttribute);
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
              return attributeCell(obj);
            })}

          <View
            style={{
              width: '100%',
              marginTop: RFValue(10),
            }}>
            <Menu>
              <MenuTrigger>
                <Button mode="contained" textColor="#FFFFFF">
                  {titleAttributeText}
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
                {item.attributes.map((opt, i) => {
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
                        onTitleAttributeSelection(opt);
                      }}>
                      <Text
                        style={{
                          color: colors.black,
                          fontSize: 20,
                        }}>
                        {opt.value}
                      </Text>
                    </MenuOption>
                  );
                })}
              </MenuOptions>
            </Menu>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: RFValue(10),
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
