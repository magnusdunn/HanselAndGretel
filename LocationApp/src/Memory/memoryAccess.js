
import AsyncStorage from '@react-native-async-storage/async-storage'
import createUser from '../APIs/createUser';

export async function setUID()  {
    try {
        const id = await createUser();
        console.log("uid from fb =", id);
        await AsyncStorage.setItem(
            `uid`, 
            `${id}`
        );
        return id;
    } catch (error) {
      console.log(`Error: ${error}`)
    }
};
export async function getUID(){
    try {
        const value = await AsyncStorage.getItem('uid');
        if (value !== null) {
            // We have data!!
            // console.log(`Data from uid storage: ${value}`);
            return value;
        }
        else{
            console.log("No data");
            return false;
        }
    } catch (error) {
          console.log(`Error: ${error}`)
    }
};
export async function removeItemValue(key) {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}