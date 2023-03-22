// This function creates a new trip collection in a users table where location data can be stored

import firestore from '@react-native-firebase/firestore';

// Params:
// TripName: Name of trip
// Will need to add other info as project progresses
export default function pushNewTrip(tripName) {
    firestore()
    .collection('Test')
    .doc("TestUser")
    .collection("TestTrip")
    .doc("UserPermissions")
    .set({
        Test: "Success"
    })
    .then(() => {
        console.log('sent');
    })
    .catch(error => {
        console.log(`Error in pushing location to database. Error ${error}`)
    })
};
