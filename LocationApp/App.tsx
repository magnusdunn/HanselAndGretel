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

import { usersCollection }  from './src/APIs/Test';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function App(): JSX.Element {

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}


export default App;
