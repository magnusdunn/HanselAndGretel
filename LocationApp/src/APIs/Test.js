import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';
// import { firestore } from "firebase-admin";

// export const usersCollection = firestore().collection('Test');

export const usersCollection = firestore()
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


