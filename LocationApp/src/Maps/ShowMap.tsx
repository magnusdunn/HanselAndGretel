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
    Button
} from 'react-native';
import MapView,
{ PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle }
    from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { styles } from '../Context/Styles';

// const ShowMap = () => {

//     const [location, setLocation] = useState({
//         latitude: 0,
//         longitude: 0,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//     });
//     const [markerLocation, setMarkerLocation] = useState({
//         latitude: 0,
//         longitude: 0,
//     });
//     const intervalRef = useRef(0);

//     useEffect(() => {
//         const watchID = Geolocation.watchPosition(
//             position => {
//                 setLocation({
//                     latitude: position.coords.latitude,
//                     longitude: position.coords.longitude,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 });
//                 if (intervalRef.current && intervalRef.current !== 0) {
//                     clearInterval(intervalRef.current);
//                 }
//                 if (!intervalRef.current && intervalRef.current !== 0) {
//                     intervalRef.current = setInterval(() => {
//                         setMarkerLocation(prevState => ({
//                             latitude: position.coords.latitude,
//                             longitude: position.coords.longitude,
//                         }));
//                     }, 10000); // 10 seconds interval
//                 }
//             },
//             error => {
//                 console.log(error);
//             },
//             { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
//         );
//         return () => {
//             Geolocation.clearWatch(watchID);
//             clearInterval(intervalRef.current);
//         }
//     }, []);

//     return (
//         <View style={styles.map}>
//             {location && (
//                 <MapView
//                     provider={PROVIDER_GOOGLE}
//                     style={styles.map}
//                     showsUserLocation={true}
//                     region={location}>
//                 </MapView>
//             )}
//             {markerLocation && (
//                 <Marker coordinate={markerLocation} />
//             )}
//         </View>
//     );
// };

// export default ShowMap;


const ShowMap = () => {

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [markerLocations, setMarkerLocations] = useState([] as any[]);
    const intervalRef = useRef(0);

    useEffect(() => {
        const watchID = Geolocation.watchPosition(
            position => {
                const newLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };
                setLocation(newLocation);
                if (!intervalRef.current) {
                    intervalRef.current = setInterval(() => {
                        setMarkerLocations(prevState => [...prevState, newLocation]);
                    }, 10000);
                } else {
                    setMarkerLocations(prevState => [...prevState, newLocation]);
                }
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 1000,
                distanceFilter: 500
            }
        );

        return () => {
            Geolocation.clearWatch(watchID);
            clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <View style={styles.map}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                region={location}>
                {markerLocations.map((marker, index) => (
                    <Marker key={index} coordinate={marker} />
                ))}
            </MapView>
        </View>
    );
};

export default ShowMap;
