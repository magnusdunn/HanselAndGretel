import React, { Component, useState, useEffect, useRef } from 'react';
import {
    View,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import MapView,
{ PROVIDER_GOOGLE, MarkerAnimated }
    from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { styles } from '../Context/Styles';



const ShowTrip = ({ navigation }: { navigation: any }) => {

    const mapViewRef = useRef<MapView | null>(null);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
    });

    const renderMarkers = () => {
        // Need to get locations for markers from firebase
    }

    useEffect(() => {
        const watchID = Geolocation.watchPosition(
            position => {
                const newLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: location.latitudeDelta,
                    longitudeDelta: location.longitudeDelta,
                };
                setLocation(newLocation);
                if (mapViewRef.current) {
                    mapViewRef.current.animateToRegion(newLocation, 1000);
                }
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 1000,
                distanceFilter: 50,
            }
        );
    }, [location.latitudeDelta, location.longitudeDelta]);


    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={location}
                    ref={mapViewRef}
                >
                    {/* {renderMarkers()} */}
                </MapView>
            </View>
            <View style={styles.home}>
                <Button title="Home" onPress={() => navigation.navigate("Home")} />
            </View>
        </View>
    );
}

export default ShowTrip
