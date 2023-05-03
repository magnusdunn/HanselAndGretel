import { firestore } from "firebase-admin";

    export function getUsers(currUser) {
        var data = "{"
        firestore()
        .collection("Users")
        .get()
        .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var id = JSON.stringify(documentSnapshot.id); 
                    // console.log(id);
                    var d = JSON.stringify(documentSnapshot.data());
                    data += `${id}: ${d},`;
            });
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });

        const ret = JSON.parse(data.substring(0, data.length-1)+ "}");
        console.log(ret);
        return ret;
    }