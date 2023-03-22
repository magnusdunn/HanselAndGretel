/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  console.log(`Asyncstorage test`)
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        `uid`, 
        `test`
      );
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  };
  const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('uid');
        if (value !== null) {
          // We have data!!
          console.log(value);
        }
        else{
          console.log("No data");
        }
      } catch (error) {
        console.log(`Error: ${error}`)
      }
  };
    console.log(`test set: ${_retrieveData}`)
  return (
    <ShowMap />
  );
}


export default App;
