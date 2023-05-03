import firestore from '@react-native-firebase/firestore';

//Todo: make function with params and find the rest of command options. THen extend to different usages 

export async function getLocations(){
    var data = `{`
    await firestore()
    .collection('Users/CKPrJmkfW8KXZyANvxcP/TestTrip')
    .get()
    .then(collectionSnapshot => {
        // console.log('Number of Documents: ', collectionSnapshot.size);
        collectionSnapshot
            .forEach(documentSnapshot => {
                var id = JSON.stringify(documentSnapshot.id); 
                // console.log(id);
                var d = JSON.stringify(documentSnapshot.data());
                // console.log(d);
                if(id == `"UserPermissions"`){
                    data += `${id}: ${d}}`;
                }
                else{
                    data += `${id}: ${d},`;
                }
                // console.log(data);
                // console.log('Documaent Contents: ', documentSnapshot.id,
                //     documentSnapshot.data());
            });
    })
    .catch(error => {
        console.log(`Error: ${error}`)
    });
    // console.log(data);
    const ret = JSON.parse(data);
    console.log(ret);
    return ret;
};