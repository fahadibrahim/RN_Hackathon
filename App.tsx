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
import {Appearance, StatusBar, useColorScheme, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {MenuProvider} from 'react-native-popup-menu';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {DarkTheme, LightTheme} from './src/helper/Themes';
import RootNavigator from './src/system/navigation/RootNavigator';
import {persistor, store} from './src/system/redux/store/store';
import AppBackgroundContainer from './src/ui/components/AppBackgroundContainer';
import AppContextProvider from './src/ui/components/AppContextProvider';

const App = () => {
  // --------OLD CODE----- TODO--------

  // const {theme, changeTheme} = useContext(AppContext);

  const [myAppTheme, setMyAppTheme] = useState(LightTheme);

  const scheme = Appearance.getColorScheme();

  const navigationRef = createNavigationContainerRef();

  useEffect(() => {
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

  // -------- /OLD CODE/- TODO------------

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <MenuProvider>
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
    </MenuProvider>
  );
};

export default App;
