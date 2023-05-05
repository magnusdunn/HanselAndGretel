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
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Context/Styles';
import { getLocations } from '../APIs/getLocation'


type props = {
    ID: string;
}

const ShowTrip = (props:any) => {
    const id = props.route.params.uid;
    console.log("id", id);
    const navigation = useNavigation()
    const mapViewRef = useRef<MapView | null>(null);
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
    });
    const [markerLocations, setMarkerLocations] = useState([] as any[]);
    const markerRef = useRef<(typeof MarkerAnimated | null)[]>([]);
    const [lastMarkerTime, setLastMarkerTime] = useState(0);
    const [followingUser, setFollowingUser] = useState(true);
    const startInterval = () => {
        const intervalId = setInterval(() => {
            if (markerLocations.length > 0) {
                const lastMarkerIndex = markerLocations.length - 1;
            }
        }, 2000);
        return intervalId;
    };
    // const fetch = async () => {
    //     const response = await getLocations();
    //     await setMarkerLocations(response)
    //     console.log(response)
    // }
    useEffect(() => {

        // fetch();
        console.log("markerLoc", markerLocations)
        const watchID = Geolocation.watchPosition(
            position => {
                const currentTime = Date.now();
                if (currentTime - lastMarkerTime >= 5000) {
                    console.log("before fetch")
                    const fetch = async () => {
                        const response = await getLocations(String(id));
                        setMarkerLocations(response)
                        // console.log(response)
                    }
                    console.log("time", lastMarkerTime)
                    fetch();
                    console.log("after fetch")
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
                    setLastMarkerTime(currentTime);
                    console.log("time", lastMarkerTime)
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
        console.log(location)

        const intervalId = startInterval();

        return () => {
            Geolocation.clearWatch(watchID);
            clearInterval(intervalId);
        };

    }, [lastMarkerTime, location.latitudeDelta, location.longitudeDelta, markerLocations]);

    const renderMarkers = () => {
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

    const handleCenterPress = () => {
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(location, 250);
            setFollowingUser(true);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={true}
                    initialRegion={location}
                    followsUserLocation={followingUser}
                    onPanDrag={() => setFollowingUser(false)}
                    ref={mapViewRef}
                >
                    {renderMarkers()}
                </MapView>
            </View>
            <View style={styles.centerButton}>
                <Button title="Center" onPress={handleCenterPress} />
            </View>
            <View style={styles.home}>
                <Button title="Home" onPress={() => navigation.navigate("Home")} />
            </View>
        </View>
    );
}

export default ShowTrip
