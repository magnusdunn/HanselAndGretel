import firebase from "@react-native-firebase/app";

export async function test(){
    var data = await firebase.firestore()
    .collection('Test')
    .get();

    console.log(data);
};