import firestore from '@react-native-firebase/firestore';

export default function createUser(userName) {
    const res = firestore()
    .collection('Users')
    .add({
        UserName: userName, 
    })
    .then((sentDoc) => {
        console.log('created:', sentDoc.id);
        return sentDoc.id
    });
    console.log(res.id)
    return res;
};