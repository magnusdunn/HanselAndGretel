// This function will serve as the function to send a location to the backend. 
// Evetually, this will include user and trip params, but for now it will just send a location

import firestore from '@react-native-firebase/firestore';


// Params:
// lat: latitude
// lon: longitude
// Will need to add path trip so location can be properly added
export default function pushLocation(lat, lon) {
    firestore()
    .collection('Test/TestUser/TestTrip')
    .doc("Location1")
    .set({
        Latitude: lat,
        Longitude: lon
    })
    .then(() => {
        console.log('sent');
    })
    .catch(error => {
        console.log(`Error in pushing location to database. Error ${error}`)
    }) 
};