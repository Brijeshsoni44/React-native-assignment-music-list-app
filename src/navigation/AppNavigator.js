import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import SongsListScreen from '../features/songs/screens/SongsListScreen';
import SongDetailScreen from '../features/songs/screens/SongDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SongsList" 
          component={SongsListScreen} 
          options={{ title: 'Michael Jackson Songs' }} 
        />
        <Stack.Screen 
          name="SongDetail" 
          component={SongDetailScreen} 
          options={{ title: 'Song Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;