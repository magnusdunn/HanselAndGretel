import firestore from '@react-native-firebase/firestore';

export default function createUser() {
    const res = firestore()
    .collection('Users')
    .add({
        test: 'I created you', 
    })
    .then((sentDoc) => {
        console.log('created:', sentDoc.id);
        return sentDoc.id
    });
    console.log(res.id)
    return res;
};