import { firestore } from '@react-native-firebase/firestore';

    export async function getUsers(uid) {
        var ret = [];
        await firestore()
        .collection('Users')
        .get()
        .then(collectionSnapshot => {
            // console.log('Number of Documents: ', collectionSnapshot.size);
            collectionSnapshot.forEach(documentSnapshot => {
                
                var id = documentSnapshot.id; 
                console.log(id, uid);
                var d = JSON.stringify(documentSnapshot.data().UserName);
                // console.log(d);

                if(uid !== id){
                    var part = JSON.parse(`{"ID" : "${id}", "UserName": ${d}}`);
                    // console.log(part);
                    ret.push(part);
                }
                // console.log(ret);
                // console.log('Documaent Contents: ', documentSnapshot.id,
                //     documentSnapshot.data());
                });
        })
        .catch(error => {
            console.log(`Error: ${error}`)
        });
        // console.log(data)
        // const ret = JSON.parse(data.substring(0, data.length-1)+ "]");
        // console.log(ret);
        return ret;
    }