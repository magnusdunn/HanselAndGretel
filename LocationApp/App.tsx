/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

// import { styles } from './src/Context/Styles';
import firestore from '@react-native-firebase/firestore';
import { usersCollection } from './src/APIs/GetterAPI';
import push from './src/APIs/PushAPI';
import HomeScreen from './src/Screens/Home';
import FriendsScreen from './src/Screens/FindFriend';
import ShowMap from './src/Maps/ShowMap';
import FriendsTrips from './src/Screens/friendTrips';
import { getUID, setUID, removeItemValue } from './src/Memory/memoryAccess';
import LoginScreen from './src/Screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowTrip from './src/Maps/ShowTrip';
import { getLocations } from './src/APIs/getLocation';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  // console.log(getLocations());
  // removeItemValue('uid');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Friends"
          component={FriendsScreen}
        />
        <Stack.Screen name="Map"
          component={ShowMap}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ShowTrip"
          component={ShowTrip}
          options={{ headerShown: false }}
        />
         <Stack.Screen name="friendsTrip"
          component={FriendsTrips}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
