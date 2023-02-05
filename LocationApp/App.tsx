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
import { test } from './src/APIs/Test';

function App() {

  test()
  
  return (

    <View style = {styles.text}>
      <Text>
        Location App
      </Text>
    </View>
  );
}


export default App;
