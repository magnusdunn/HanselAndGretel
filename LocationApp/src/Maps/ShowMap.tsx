import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { Component } from 'react';
import { styles } from '../Context/Styles';


export default class ShowMap extends Component {


    render() {
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
}