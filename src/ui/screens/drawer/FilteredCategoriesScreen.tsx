import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {cacheUpdate} from '../../../system/redux/actions/appActions';
import {Category} from '../../../system/redux/reducers/interfaces/interfaces';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../system/redux/store/hooks';
import ScreenBackgroundContainerWithOutSafeArea from '../../components/ScreenBackgroundContainerWithOutSafeArea';
// import AppStyles from '../../App/App.styles';

const FilteredCategoriesScreen = ({route}) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const [myData, setMyData] = useState(null);

  const inventory = useAppSelector(state => state.app.inventory);
  const actionState = useAppSelector(state => state.app.actionState);
  const filteredScreen = useAppSelector(state => state.app.filteredScreen);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: filteredScreen.categoryName,
    });
  }, []);

  useEffect(() => {
    setMyData(inventory.find(obj => obj.structure.id === filteredScreen.id));
  }, []);

  useMemo(() => {
    inventory.map(obj => {
      if (!!myData && obj.structure.id === myData.structure.id) {
        obj.items = myData.items;
      }
    });
    dispatch(cacheUpdate(inventory));
  }, [myData]);

  useMemo(() => {
    // if (actionState === ADD_NEW_CATEGORY) {
    //   setMyData(inventory);
    // } else {
    //   dispatch(appIdle());
    // }
  }, [inventory]);

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

              if (!!myData && myData.length > 0) {
                const arrayOfIds = myData.map(obj => obj.id);

                newID = Math.max.apply(0, arrayOfIds) + 1;
              }

              let newItem: Category = {
                id: newID,
                categoryName: myData.structure.categoryName,
                attributes: myData.structure.attributes,
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
            <View>
              <Text>Show Flat List</Text>
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
        </View>
      </View>
    </ScreenBackgroundContainerWithOutSafeArea>
  );
};

export default FilteredCategoriesScreen;
