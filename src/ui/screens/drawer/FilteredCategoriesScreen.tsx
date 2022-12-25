
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {addNewCategoryAction} from '../../../system/redux/actions/appActions';
import {Machines} from '../../../system/redux/reducers/interfaces/interfaces';
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
  const inventory = useAppSelector(state => state.app.inventory);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Categories',
    });
  }, []);

  return (
    <ScreenBackgroundContainerWithOutSafeArea theme={colors}>
      <View style={{flex: 1}}>
        <Text>Filtered Categories</Text>

        <Button
          // icon="camera"
          mode="contained"
          textColor="#FFFFFF"
          style={{
            margin: RFValue(10),
          }}
          onPress={() => {
            // let newCategory: Machines = {
            //   items: [],
            //   structure: {
            //     categoryName: 'New Category',
            //     attributes: [],
            //   },
            // };
            // inventory.push(newCategory);

            // dispatch(addNewCategoryAction(newCategory));
          }}>
          Add New Category
        </Button>

        {/* <FullScreenSpinner
          loading={false}
          title={'Please wait...'}
        /> */}
      </View>
    </ScreenBackgroundContainerWithOutSafeArea>
  );
};

export default FilteredCategoriesScreen;
