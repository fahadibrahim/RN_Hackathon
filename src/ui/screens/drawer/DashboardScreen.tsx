import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';

import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {APP_DATA_TYPES} from '../../../helper/enum';
import {ScreenNames} from '../../../system/navigation/ScreenNames';
import {itemUpdate} from '../../../system/redux/actions/appActions';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../system/redux/store/hooks';
import ScreenBackgroundContainerWithOutSafeArea from '../../components/ScreenBackgroundContainerWithOutSafeArea';

const DashboardScreen = ({route}) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  // const [date, setDate] = useState(new Date());
  // const [open, setOpen] = useState(false);

  // const [dateItemObject, setDateItemObject] = useState(null);

  // const [myData, setMyData] = useState(null);
  // const [mySectionData, setMySectionData] = useState([]);

  // const inventory = useAppSelector(state => state.app.inventory);
  // const actionState = useAppSelector(state => state.app.actionState);
  // const actionComponent = useAppSelector(state => state.app.actionComponent);
  // const filteredScreen = useAppSelector(state => state.app.filteredScreen);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: 'Dashboard',
  //   });
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log('Fahad Mount!');
  //     updateAttributesFromReduxState();

  //     // const unsubscribe = API.subscribe(userId, user => setUser(user));

  //     return () => {
  //       if (inventory.length > 0) {
  //         let updatedInventory = JSON.parse(JSON.stringify(inventory));
  //         updatedInventory.map(obj => {
  //           if (!!myData) {
  //             if (obj.structure.id === myData.structure.id) {
  //               obj.items = myData.items;
  //             }
  //           }
  //         });

  //         dispatch(
  //           itemUpdate({
  //             data: updatedInventory,
  //             actionComponent: ScreenNames.DashboardScreen,
  //           }),
  //         );
  //       }

  //       console.log('Fahad gone!');
  //     };
  //   }, []),
  // );

  // useEffect(() => {
  //   // console.log("Fahad Mount!");
  //   //updateAttributesFromReduxState();
  // }, []);

  // const updateAttributesFromReduxState = () => {
  //   const myFilteredInventoryArrayOrigninal = JSON.parse(
  //     JSON.stringify(inventory),
  //   );

  //   if (
  //     !!myFilteredInventoryArrayOrigninal &&
  //     myFilteredInventoryArrayOrigninal.length > 0
  //   ) {
  //     myFilteredInventoryArrayOrigninal.map(originalObj => {
  //       const myFilteredAttributes = JSON.parse(
  //         JSON.stringify(originalObj.structure.attributes),
  //       );

  //       const updatedItems = originalObj.items.map(obj => {
  //         let updatedAttributes = [];

  //         updatedAttributes = myFilteredAttributes.map(attObj => {
  //           const actAtt = {...obj};
  //           const matchingAttribute = actAtt.attributes.find(
  //             matObject =>
  //               matObject.id === attObj.id &&
  //               matObject.label === attObj.label &&
  //               matObject.type === attObj.type,
  //           );

  //           console.log('Map1: ', matchingAttribute);
  //           if (!!matchingAttribute) {
  //             if (attObj.type === APP_DATA_TYPES.CheckBox) {
  //               attObj.boolValue = matchingAttribute.boolValue;
  //             } else {
  //               attObj.value = matchingAttribute.value;
  //             }

  //             return {...attObj};
  //           } else {
  //             return {...attObj};
  //           }
  //         });
  //         console.log('Fahad Error: ', updatedAttributes);

  //         return {
  //           ...obj,
  //           attributes: updatedAttributes,
  //         };
  //       });

  //       originalObj.items = updatedItems;
  //     });

  //     setMyData(myFilteredInventoryArrayOrigninal);

  //     const vv = myFilteredInventoryArrayOrigninal.map(obj => {
  //       return {
  //         title: obj.structure.categoryName,
  //         data: [{...obj}],
  //       };
  //     });

  //     setMySectionData(vv);
  //   } else {
  //     // setMyData([]);
  //   }
  // };

  // // useMemo(() => {
  // //   // let updatedInventory = [...inventory];
  // //   // updatedInventory.map(obj => {
  // //   //   if (!!myData) {
  // //   //     if (obj.structure.id === myData.structure.id) {
  // //   //       obj.items = myData.items;
  // //   //     }
  // //   //   }
  // //   // });

  // //   // dispatch(
  // //   //   itemUpdate({
  // //   //     data: updatedInventory,
  // //   //     actionComponent: ScreenNames.DashboardScreen,
  // //   //   }),
  // //   // );
  // // }, [myData]);

  // useMemo(() => {
  //   // if (actionState === CATEGORY_UPDATE) {
  //   //   updateAttributesFromReduxState();
  //   // } else if (actionState === ITEM_UPDATE) {
  //   //   dispatch(
  //   //     appIdle({
  //   //       data: {},
  //   //       actionComponent: ScreenNames.DashboardScreen,
  //   //     }),
  //   //   );
  //   // } else {
  //   //   dispatch(
  //   //     appIdle({
  //   //       data: {},
  //   //       actionComponent: ScreenNames.DashboardScreen,
  //   //     }),
  //   //   );
  //   // }
  // }, [inventory]);

  // useMemo(() => {
  //   if (!!myData) {
  //     setMyData(prevState => {
  //       let updatedAttributes = prevState.items.map(obj => {
  //         if (dateItemObject.itemID === obj.id) {
  //           obj.attributes.map(attObj => {
  //             if (dateItemObject.attributeItem.id === attObj.id) {
  //               const formatedString = moment(date).format('DD/MM/YYYY');

  //               attObj.value = formatedString;
  //               attObj.date = date;
  //             }
  //           });
  //           return obj;
  //         } else {
  //           return obj;
  //         }
  //       });

  //       const newState = {
  //         ...prevState,
  //         items: updatedAttributes,
  //       };

  //       console.log('Fahad log New: ', newState);

  //       return newState;
  //     });
  //   }
  // }, [date]);

  // const _keyExtractor = (item, index) => index.toString();

  return (
    <ScreenBackgroundContainerWithOutSafeArea theme={colors}>
      <View style={{flex: 1}}>
        <Text>TODO (A FEW BUGS)</Text>
        {/* <View
          style={{
            flex: 1,
            marginBottom: RFValue(30),
          }}>
          {!!mySectionData && mySectionData.length > 0 ? (
            // <SectionList
            //   style={{
            //     // width: "100%",
            //     marginTop: RFValue(10),
            //     marginBottom: RFValue(10),
            //     // backgroundColor: "#790642",
            //   }}
            //   contentContainerStyle={
            //     {
            //       // width: "100%",
            //     }
            //   }
            //   sections={mySectionData}
            //   renderItem={(item, index) => {
            //     return (
            //       <View>
            //         <Text>FAhad</Text>
            //       </View>
            //       // <ItemCell
            //       //   item={item}
            //       //   itemIndex={index}
            //       //   onItemRemove={(item, itemIndex) => {
            //       //     setMyData(prevState => {
            //       //       prevState.items.splice(itemIndex, 1);

            //       //       const newState = {
            //       //         ...prevState,

            //       //         items: [...prevState.items],
            //       //       };
            //       //       return newState;
            //       //     });
            //       //   }}
            //       //   onAttributeValueUpdate={(
            //       //     itemId,
            //       //     attribute,
            //       //     updatedValue,
            //       //   ) => {
            //       //     setMyData(prevState => {
            //       //       let updatedAttributes = prevState.items.map(obj => {
            //       //         if (itemId === obj.id) {
            //       //           obj.attributes.map(attObj => {
            //       //             if (attribute.id === attObj.id) {
            //       //               if (
            //       //                 attribute.type === APP_DATA_TYPES.CheckBox
            //       //               ) {
            //       //                 attObj.boolValue = updatedValue;
            //       //               } else {
            //       //                 attObj.value = updatedValue;
            //       //               }
            //       //             }
            //       //           });
            //       //           return obj;
            //       //         } else {
            //       //           return obj;
            //       //         }
            //       //       });

            //       //       const newState = {
            //       //         ...prevState,
            //       //         items: updatedAttributes,
            //       //       };

            //       //       console.log('Fahad log New: ', newState);

            //       //       return newState;
            //       //     });
            //       //   }}
            //       //   openDatePicker={(itemID, attributeItem) => {
            //       //     setOpen(true);

            //       //     setDateItemObject({
            //       //       itemID: itemID,
            //       //       attributeItem: attributeItem,
            //       //     });
            //       //   }}
            //       // />
            //     );
            //   }}
            //   stickySectionHeadersEnabled={false}
            //   ListFooterComponent={<View style={{height: 20}} />}
            //   renderSectionHeader={({section}) => (
            //     <View
            //       style={{
            //         flexDirection: 'row',
            //         margin: RFValue(10),
            //       }}>
            //       <Text
            //         style={{
            //           flex: 1,
            //         }}
            //         variant="headlineMedium">
            //         {section.title}
            //       </Text>

            //       <Button
            //         mode="contained"
            //         textColor="#FFFFFF"
            //         onPress={() => {
            //           var newID = 1;

            //           if (!!myData && myData.items.length > 0) {
            //             const arrayOfIds = myData.items.map(obj => obj.id);

            //             newID = Math.max.apply(0, arrayOfIds) + 1;
            //           }

            //           let newItem: Category = {
            //             id: newID,
            //             categoryName: filteredScreen.categoryName,
            //             attributes: filteredScreen.attributes,
            //           };

            //           setMyData(prevState => {
            //             const newState = {
            //               ...prevState,
            //               items: [...prevState.items, {...newItem}],
            //             };
            //             return newState;
            //           });
            //         }}>
            //         Add New Item
            //       </Button>
            //     </View>
            //   )}
            //   keyExtractor={_keyExtractor}
            // />
            <View>
              <Text>Fahad Section</Text>
            </View>
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
        </View> */}
      </View>
    </ScreenBackgroundContainerWithOutSafeArea>
  );
};

export default DashboardScreen;
