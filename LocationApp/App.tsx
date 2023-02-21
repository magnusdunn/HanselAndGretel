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
import ShowMap from './src/Maps/ShowMap';


function App(): JSX.Element {
  // console.log(usersCollection);
  // push();
  return (
    <ShowMap />
  );
}


export default App;
