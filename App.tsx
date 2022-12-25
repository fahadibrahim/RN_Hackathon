/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {DarkTheme, LightTheme} from './src/helper/Themes';
import RootNavigator from './src/system/navigation/RootNavigator';
import {persistor, store} from './src/system/redux/store/store';
import AppBackgroundContainer from './src/ui/components/AppBackgroundContainer';
import AppContextProvider from './src/ui/components/AppContextProvider';

// const Section: React.FC<
//   PropsWithChildren<{
//     title: string;
//   }>
// > = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  // --------OLD CODE-------------

  // const {theme, changeTheme} = useContext(AppContext);

  const [myAppTheme, setMyAppTheme] = useState(LightTheme);

  const scheme = Appearance.getColorScheme();

  const navigationRef = createNavigationContainerRef();

  useEffect(() => {
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    // store.dispatch(
    //   setDeviceOrientation({
    //     orientation: isPortrait()
    //       ? SCREEN_ORIENTATION_ENUM.PORTRAIT
    //       : SCREEN_ORIENTATION_ENUM.LANDSCAPE,
    //   }),
    // );
    // setOrientation(
    //   isPortrait()
    //     ? SCREEN_ORIENTATION_ENUM.PORTRAIT
    //     : SCREEN_ORIENTATION_ENUM.LANDSCAPE,
    // );
    // setDeviceDisplayValues(Dimensions.get('screen'));

    // const isLandscape = () => {
    //   const dim = Dimensions.get('screen');
    //   return dim.width >= dim.height;
    // };

    Dimensions.addEventListener('change', () => {
      console.log('fahad Dimension changes:', isPortrait());

      // setOrientation(
      //   isPortrait()
      //     ? SCREEN_ORIENTATION_ENUM.PORTRAIT
      //     : SCREEN_ORIENTATION_ENUM.LANDSCAPE,
      // );
      // store.dispatch(
      //   setDeviceOrientation({
      //     orientation: isPortrait()
      //       ? SCREEN_ORIENTATION_ENUM.PORTRAIT
      //       : SCREEN_ORIENTATION_ENUM.LANDSCAPE,
      //   }),
      // );
    });

    setMyAppTheme(scheme === 'dark' ? DarkTheme : LightTheme);

    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      // Updated Scheme Color
      setMyAppTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
    });

    return () => {
      // Remove the subscription at unmount
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log('Fahad Theme changes: ', myAppTheme);
  }, [myAppTheme]);

  // -------- /OLD CODE/-------------

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <AppBackgroundContainer theme={myAppTheme}>
        <View
          style={{
            flex: 1,
          }}>
          <AppContextProvider>
            <NavigationContainer
              theme={scheme === 'dark' ? DarkTheme : LightTheme}
              ref={navigationRef}>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  {/* <Provider store={store}> */}
                  <RootNavigator />

                  <StatusBar
                    backgroundColor={myAppTheme.colors.appBackground}
                    barStyle="dark-content"
                    // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  />
                </PersistGate>
              </Provider>
            </NavigationContainer>
          </AppContextProvider>
        </View>
      </AppBackgroundContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
