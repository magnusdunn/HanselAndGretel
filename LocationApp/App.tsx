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

// import { usersCollection }  from './src/APIs/Test';

function App() {

  // usersCollection;
  // console.log(usersCollection);
  const usersCollection = firestore()
    .collection('Test')
    .get()
    .then(collectionSnapshot => {
        console.log('Test: ', collectionSnapshot.size);
        collectionSnapshot
            .forEach(documentSnapshot => {
                console.log('QueryTest1: ', documentSnapshot.id,
                    documentSnapshot.data());
            });
    })
    ;
    console.log(usersCollection)
  return (

    <View style = {styles.text}>
      <Text>
        Location App
      </Text>
    </View>
  );
}


export default App;
