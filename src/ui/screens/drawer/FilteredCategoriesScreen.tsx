import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button, Text} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {APP_DATA_TYPES} from '../../../helper/enum';
import moment from "moment";
import {ScreenNames} from '../../../system/navigation/ScreenNames';
import {
  CATEGORY_UPDATE,
  ITEM_UPDATE,
} from '../../../system/redux/actions/actionTypes';
import {appIdle, itemUpdate} from '../../../system/redux/actions/appActions';
import {Category} from '../../../system/redux/reducers/interfaces/interfaces';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../system/redux/store/hooks';
import {ItemCell} from '../../components/ItemCell';
import ScreenBackgroundContainerWithOutSafeArea from '../../components/ScreenBackgroundContainerWithOutSafeArea';

// import AppStyles from '../../App/App.styles';

const FilteredCategoriesScreen = ({route}) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [dateItemObject, setDateItemObject] = useState(null);

  const [myData, setMyData] = useState(null);

  const inventory = useAppSelector(state => state.app.inventory);
  const actionState = useAppSelector(state => state.app.actionState);
  const actionComponent = useAppSelector(state => state.app.actionComponent);
  const filteredScreen = useAppSelector(state => state.app.filteredScreen);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: filteredScreen.categoryName,
    });
  }, []);

  useEffect(() => {
    updateAttributesFromReduxState();
  }, []);

  const updateAttributesFromReduxState = () => {
    const myFilteredInventoryObjectOrigninal = JSON.parse(
      JSON.stringify(
        inventory.find(obj => obj.structure.id === filteredScreen.id),
      ),
    );

    const myFilteredInventoryObject = JSON.parse(
      JSON.stringify(
        inventory.find(obj => obj.structure.id === filteredScreen.id),
      ),
    );

    const myFilteredAttributes = JSON.parse(
      JSON.stringify(filteredScreen.attributes),
    );

    const updatedItems = myFilteredInventoryObject.items.map(obj => {
      let updatedAttributes = [];

      updatedAttributes = myFilteredAttributes.map(attObj => {
        const actAtt = {...obj};
        const matchingAttribute = actAtt.attributes.find(
          matObject =>
            matObject.id === attObj.id &&
            matObject.label === attObj.label &&
            matObject.type === attObj.type,
        );

        console.log('Map1: ', matchingAttribute);
        if (!!matchingAttribute) {
          if (attObj.type === APP_DATA_TYPES.CheckBox) {
            attObj.boolValue = matchingAttribute.boolValue;
          } else {
            attObj.value = matchingAttribute.value;
          }

          return {...attObj};
        } else {
          return {...attObj};
        }
      });
      console.log('Fahad Error: ', updatedAttributes);

      return {
        ...obj,
        attributes: updatedAttributes,
      };
    });

    myFilteredInventoryObjectOrigninal.items = updatedItems;
    setMyData(myFilteredInventoryObjectOrigninal);
  };

  useMemo(() => {
    let updatedInventory = [...inventory];
    updatedInventory.map(obj => {
      if (!!myData) {
        if (obj.structure.id === myData.structure.id) {
          obj.items = myData.items;
        }
      }
    });
    dispatch(
      itemUpdate({
        data: updatedInventory,
        actionComponent: ScreenNames.FilteredCategoriesScreen,
      }),
    );
  }, [myData]);

  useMemo(() => {
    if (actionState === CATEGORY_UPDATE) {
      updateAttributesFromReduxState();
    } else if (actionState === ITEM_UPDATE) {
      dispatch(
        appIdle({
          data: {},
          actionComponent: ScreenNames.FilteredCategoriesScreen,
        }),
      );
    } else {
      dispatch(
        appIdle({
          data: {},
          actionComponent: ScreenNames.FilteredCategoriesScreen,
        }),
      );
    }
  }, [inventory]);

  useMemo(() => {

    if(!!myData) {
      setMyData(prevState => {
        let updatedAttributes = prevState.items.map(obj => {
          if (dateItemObject.itemID === obj.id) {
            obj.attributes.map(attObj => {
              if (dateItemObject.attributeItem.id === attObj.id) {
                const formatedString = moment(date).format("DD/MM/YYYY");
                
                attObj.value = formatedString;
                attObj.date = date;
              }
            });
            return obj;
          } else {
            return obj;
          }
        });
  
        const newState = {
          ...prevState,
          items: updatedAttributes,
        };
  
        console.log('Fahad log New: ', newState);
  
        return newState;
      });
    }
    
  }, [date]);

  const _keyExtractor = (item, index) => index.toString();

  return (
    <ScreenBackgroundContainerWithOutSafeArea theme={colors}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            margin: RFValue(10),
          }}>
          <Text
            style={{
              flex: 1,
            }}
            variant="headlineMedium">
            {filteredScreen.categoryName}
          </Text>

          <Button
            mode="contained"
            textColor="#FFFFFF"
            onPress={() => {
              var newID = 1;

              if (!!myData && myData.items.length > 0) {
                const arrayOfIds = myData.items.map(obj => obj.id);

                newID = Math.max.apply(0, arrayOfIds) + 1;
              }

              let newItem: Category = {
                id: newID,
                categoryName: filteredScreen.categoryName,
                attributes: filteredScreen.attributes,
              };

              setMyData(prevState => {
                const newState = {
                  ...prevState,
                  items: [...prevState.items, {...newItem}],
                };
                return newState;
              });
            }}>
            Add New Item
          </Button>
        </View>

        <View
          style={{
            flex: 1,
            marginBottom: RFValue(30),
          }}>
          {!!myData && myData.items.length > 0 ? (
            <FlatList
              data={myData.items}
              renderItem={({item, index}) => {
                return (
                  <ItemCell
                    item={item}
                    itemIndex={index}
                    onItemRemove={(item, itemIndex) => {
                      setMyData(prevState => {
                        prevState.items.splice(itemIndex, 1);

                        const newState = {
                          ...prevState,

                          items: [...prevState.items],
                        };
                        return newState;
                      });
                    }}
                    onAttributeValueUpdate={(
                      itemId,
                      attribute,
                      updatedValue,
                    ) => {
                      setMyData(prevState => {
                        let updatedAttributes = prevState.items.map(obj => {
                          if (itemId === obj.id) {
                            obj.attributes.map(attObj => {
                              if (attribute.id === attObj.id) {
                                if (
                                  attribute.type === APP_DATA_TYPES.CheckBox
                                ) {
                                  attObj.boolValue = updatedValue;
                                } else {
                                  attObj.value = updatedValue;
                                }
                              }
                            });
                            return obj;
                          } else {
                            return obj;
                          }
                        });

                        const newState = {
                          ...prevState,
                          items: updatedAttributes,
                        };

                        console.log('Fahad log New: ', newState);

                        return newState;
                      });
                    }}
                    openDatePicker={(itemID, attributeItem) => {
                      setOpen(true);

                      setDateItemObject({
                        itemID: itemID,
                        attributeItem: attributeItem,
                      });
                    }}
                  />
                );
              }}
              keyExtractor={_keyExtractor}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text>No Data to show</Text>
            </View>
          )}
          <DatePicker
            modal
            open={open}
            date={date}
            mode={'date'}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </View>
    </ScreenBackgroundContainerWithOutSafeArea>
  );
};

export default FilteredCategoriesScreen;
