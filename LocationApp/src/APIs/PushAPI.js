import firestore from '@react-native-firebase/firestore';

// commands for pushing data:
// - .collection -> access a specific collection
// - .doc -> gets a document from a collection i.e. .collection().doc()
// - .set -> overwirtes and sets the data in a document i.e .collection().doc().set()
// - .add -> adds a document to collection i.e .collection().add()
// - .update -> adds a new field to document i.e .collection().doc().update()

// Todo: add in params and extend function for different usages

export default function push() {
    firestore()
    .collection('Test')
    .doc('QueryTest1')
    .update({
        test2: 'I can send you stuff without replacing stuff without fail',
        
    })
    .then(() => {
        console.log('sent');
    });
};