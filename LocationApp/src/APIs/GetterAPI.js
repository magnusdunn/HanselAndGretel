import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';

//Todo: make function with params and find the rest of command options. THen extend to different usages 

export const usersCollection = firestore()
    .collection('Test')
    .get()
    .then(collectionSnapshot => {
        console.log('Number of Documents: ', collectionSnapshot.size);
        collectionSnapshot
            .forEach(documentSnapshot => {
                console.log('Documaent Contents: ', documentSnapshot.id,
                    documentSnapshot.data());
            });
    });


