import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {ScreenNames} from '../../../system/navigation/ScreenNames';
import {CATEGORY_UPDATE} from '../../../system/redux/actions/actionTypes';
import {
  appIdle,
  categoryUpdate,
} from '../../../system/redux/actions/appActions';
import {Machines} from '../../../system/redux/reducers/interfaces/interfaces';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../system/redux/store/hooks';
import {CategoryCell} from '../../components/CategoryCell';
import ScreenBackgroundContainerWithOutSafeArea from '../../components/ScreenBackgroundContainerWithOutSafeArea';
// import AppStyles from '../../App/App.styles';

const ManageCategoriesScreen = ({route}) => {
  const {colors} = useTheme();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [myInventory, setMyInventory] = useState([]);
  const inventory = useAppSelector(state => state.app.inventory);
  const actionState = useAppSelector(state => state.app.actionState);
  const actionComponent = useAppSelector(state => state.app.actionComponent);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Manage Categories',
    });
  }, []);

  useEffect(() => {
    setMyInventory(inventory);
  }, []);

  useMemo(() => {
    // if (actionState === CATEGORY_UPDATE) {
    dispatch(
      categoryUpdate({
        data: myInventory,
        actionComponent: ScreenNames.ManageCategoriesScreen,
      }),
    );
    // }
  }, [myInventory]);

  useMemo(() => {
    if (actionState === CATEGORY_UPDATE) {
      setMyInventory(inventory);
    } else {
      dispatch(
        appIdle({
          data: {},
          actionComponent: ScreenNames.ManageCategoriesScreen,
        }),
      );
    }
  }, [inventory]);

  const _keyExtractor = (item, index) => index.toString();

  return (
    <ScreenBackgroundContainerWithOutSafeArea theme={colors}>
      <View
        style={{
          flexDirection: 'column-reverse',
          height: '100%',
        }}>
        <Button
          // icon="camera"
          mode="contained"
          textColor="#FFFFFF"
          style={{
            margin: RFValue(20),
          }}
          onPress={() => {
            var newID = 1;

            if (myInventory.length > 0) {
              const myCategories = myInventory.map(obj => obj.structure);
              const arrayOfIds = myCategories.map(obj => obj.id);

              newID = Math.max.apply(0, arrayOfIds) + 1;
            }

            let newCategory: Machines = {
              items: [],
              structure: {
                id: newID,
                categoryName: 'New Category',
                attributes: [],
              },
            };
            setMyInventory([...myInventory, newCategory]);
          }}>
          Add New Category
        </Button>

        {/* <Button
          // icon="camera"
          mode="contained"
          textColor="#FFFFFF"
          style={{
            margin: RFValue(20),
          }}
          onPress={() => {
            
          }}>
          Save in Cache
        </Button> */}

        <FlatList
          style={{
            flex: 1,
            marginTop: RFValue(10),
            marginBottom: RFValue(10),
          }}
          // numColumns={1}

          data={myInventory.map(obj => obj.structure)}
          renderItem={({item, index}) => {
            return (
              <CategoryCell
                item={item}
                onValueUpdate={data => {
                  setMyInventory(prevState => {
                    const newState = prevState.map(obj => {
                      if (item.id === obj.structure.id) {
                        obj.structure.categoryName = data;
                        return obj;
                      } else {
                        return obj;
                      }
                    });

                    return newState;
                  });
                }}
                onAttributeAdded={data => {
                  setMyInventory(prevState => {
                    const newState = prevState.map(obj => {
                      if (item.id === obj.structure.id) {
                        var newID = 1;

                        if (item.attributes.length > 0) {
                          const arrayOfIds = item.attributes.map(
                            attItem => attItem.id,
                          );

                          newID = Math.max.apply(0, arrayOfIds) + 1;
                        }
                        obj.structure.attributes.push({
                          id: newID,
                          label: '',
                          type: data,
                          value: '',
                          isTitle: newID === 1 ? true : false,
                        });
                        return obj;
                      } else {
                        return obj;
                      }
                    });

                    return newState;
                  });
                }}
                onAttributeRemoved={removeAttObj => {
                  setMyInventory(prevState => {
                    const newState = prevState.map(obj => {
                      if (item.id === obj.structure.id) {
                        obj.structure.attributes =
                          obj.structure.attributes.filter(
                            attObj => attObj.id !== removeAttObj.id,
                          );
                        return obj;
                      } else {
                        return obj;
                      }
                    });

                    return newState;
                  });
                }}
                onAttributeLabelUpdate={(attribute, updatedText) => {
                  setMyInventory(prevState => {
                    const newState = prevState.map(obj => {
                      if (item.id === obj.structure.id) {
                        obj.structure.attributes.map(att => {
                          if (att.id === attribute.id) {
                            att.label = updatedText;
                          }
                        });

                        return obj;
                      } else {
                        return obj;
                      }
                    });

                    return newState;
                  });
                }}
                onCategoryRemove={category => {
                  const myCategories = myInventory.map(obj => obj.structure);

                  let matchedIndex = myCategories.findIndex(
                    obj => obj.id === category.id,
                  );
                  myCategories.splice(matchedIndex, 1);

                  setMyInventory(
                    myInventory.filter(obj => item.id !== obj.structure.id),
                  );
                }}
                onTitleAttributeSelection={attribute => {
                  setMyInventory(prevState => {
                    const newState = prevState.map(obj => {
                      if (item.id === obj.structure.id) {
                        obj.structure.attributes.map(att => {
                          if (att.id === attribute.id) {
                            att.isTitle = true;
                          } else {
                            att.isTitle = false;
                          }
                        });

                        return obj;
                      } else {
                        return obj;
                      }
                    });

                    return newState;
                  });
                }}
              />
            );
          }}
          keyExtractor={_keyExtractor}
        />

        {/* <FullScreenSpinner
          loading={false}
          title={'Please wait...'}
        /> */}
      </View>
    </ScreenBackgroundContainerWithOutSafeArea>
  );
};

export default ManageCategoriesScreen;
