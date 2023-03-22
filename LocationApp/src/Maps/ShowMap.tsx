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


const ShowMap = () => {

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
    const [clearMarkers, setClearMarkers] = useState(false);
    const [stopMarkers, setStopMarkers] = useState(false);
    const [startMarkers, setStartMarkers] = useState(false);
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
                    if (startMarkers) {
                        setLocation(newLocation);
                    }
                    if (followingUser) {
                        mapViewRef.current?.animateToRegion(newLocation, 500);
                    }
                    if (startMarkers) {
                        setMarkerLocations(prevState => [
                            ...prevState,
                            {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                        ]);
                    }
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

    const handleClearMarkersPress = () => {
        setMarkerLocations([]);
        setClearMarkers(true);
    };

    const handleStartPress = () => {
        setStopMarkers(false);
        setStartMarkers(true);
    };

    const handleStopPress = () => {
        setMarkerLocations([]);
        setStopMarkers(true);
        setStartMarkers(false);
    }

    const renderMarkers = () => {
        if (clearMarkers) {
            markerRef.current = [];
            setClearMarkers(false);
        }
        if (stopMarkers) {
            return;
        }
        if (startMarkers) {
            return markerLocations.map((marker, index) => {
                return (
                    <MarkerAnimated
                        key={index}
                        ref={(ref: any) => markerRef.current[index] = ref}
                        coordinate={marker}
                    />
                );
            });
        }
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
            <View style={styles.clearButton}>
                <Button title="Clear" onPress={handleClearMarkersPress} />
            </View>
            <View style={styles.startButton}>
                <Button title="Start" onPress={handleStartPress} />
            </View>
            <View style={styles.stopButton}>
                <Button title="Stop" onPress={handleStopPress} />
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
