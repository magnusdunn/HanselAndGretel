/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

import { styles } from './src/Context/Styles';
import firestore from '@react-native-firebase/firestore';

import { usersCollection }  from './src/APIs/Test';

function App() {

    const u = usersCollection;
  return (

    <View style = {styles.text}>
      <Text>
        Test
      </Text>
    </View>
  );
}


export default App;
