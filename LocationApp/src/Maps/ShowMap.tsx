import React, { Component, useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    Platform,
    Dimensions,
    Button,
    TouchableOpacity,
} from 'react-native';
import MapView,
{ PROVIDER_GOOGLE, MarkerAnimated, Callout, Polygon, Circle }
    from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { styles } from '../Context/Styles';


type propsData = {
    uid: Promise<string | undefined>;
  };

const ShowMap = (props: propsData) => {
    console.log("UID:", props.uid._j);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
    });
    const [markerLocations, setMarkerLocations] = useState([] as any[]);
    const [lastMarkerTime, setLastMarkerTime] = useState(0);
    const [followingUser, setFollowingUser] = useState(true);
    const mapViewRef = useRef<MapView | null>(null);
    const markerRef = useRef<(typeof MarkerAnimated | null)[]>([]);
    const startInterval = () => {
        const intervalId = setInterval(() => {
            if (markerLocations.length > 0) {
                const lastMarkerIndex = markerLocations.length - 1;
            }
        }, 5000);
        return intervalId;
    };

    useEffect(() => {
        const watchID = Geolocation.watchPosition(
            position => {
                const currentTime = Date.now();
                if (currentTime - lastMarkerTime >= 5000) {
                    const newLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: location.latitudeDelta,
                        longitudeDelta: location.longitudeDelta,
                    };
                    setLocation(newLocation);
                    if (followingUser) {
                        mapViewRef.current?.animateToRegion(newLocation, 500);
                    }
                    setMarkerLocations(prevState => [
                        ...prevState,
                        {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                    ]);
                    setLastMarkerTime(currentTime);
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

        const intervalId = startInterval();

        return () => {
            Geolocation.clearWatch(watchID);
            clearInterval(intervalId);
        };
    }, [followingUser, lastMarkerTime, location.latitudeDelta, location.longitudeDelta, markerLocations]);

    const handleCenterPress = () => {
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(location, 250);
            setFollowingUser(true);
        }
    };

    const renderMarkers = () => {
        return markerLocations.map((marker, index) => {

            return (
                <MarkerAnimated
                    key={index}
                    ref={markerRef}
                    coordinate={marker}
                />
            );
        });
    };

    const carZoom = () => {
        setLocation({
            ...location,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0221,
        });
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(location, 250);
        }
    };

    const bikeZoom = () => {
        setLocation({
            ...location,
            latitudeDelta: 0.0272,
            longitudeDelta: 0.0101,
        });
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(location, 250);
        }
    }

    const walkZoom = () => {
        setLocation({
            ...location,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0071,
        });
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(location, 250);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={true}
                    followsUserLocation={followingUser}
                    ref={mapViewRef}
                    onPanDrag={() => setFollowingUser(false)}
                    initialRegion={location}
                >
                    {renderMarkers()}
                </MapView>
            </View>
            <View style={styles.centerButton}>
                <Button title="Center" onPress={handleCenterPress} />
            </View>
            <View style={styles.carButton}>
                <TouchableOpacity onPress={carZoom}>
                    <Image
                        style={styles.buttonIcon}
                        source={require('../Images/car.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={bikeZoom}>
                    <Image
                        style={styles.buttonIcon}
                        source={require('../Images/bike.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={walkZoom}>
                    <Image
                        style={styles.buttonIcon}
                        source={require('../Images/walk.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ShowMap;
