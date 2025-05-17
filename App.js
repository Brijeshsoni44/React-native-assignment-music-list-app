import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import store from './src/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;