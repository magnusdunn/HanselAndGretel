import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { usersCollection } from '../APIs/GetterAPI';
import { getUID, setUID } from '../Memory/memoryAccess';

const LoginScreen = ({ navigation }: { navigation: any }) => {

    const [isUser, setIsUser] = useState(false);
    const [userName, changeUserName] = useState("");

    const getUser = async () => {
        var result = await getUID();
        // console.log(result)
        if (result === false) {
            setIsUser(false);
        }
        else {
            setIsUser(true);
            navigation.navigate('Home');
            console.log("uid set")
        }
      }

    useEffect(() => {
        getUser();
    }, []);

    console.log(isUser);

    function createAccount(text: String){
        if (text === ""){
            setUID("null");
        }
        else{
            setUID(text);
        }
        navigation.navigate("Home");
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <View>
                <Image source={require('../assets/images/background.jpg')} />
            </View> */}
            <View style={styles.loginContainer}>
                <Text style={styles.header}>Create Acccount</Text>
                <View style={styles.textInputContainer}>
                    <TextInput placeholder='Username' onChangeText = {newText => changeUserName(newText)} />
                </View>
                <TouchableOpacity onPress={() => createAccount(userName)} style={[styles.button, styles.loginButton]} >
                    <Text style={[styles.text, styles.loginText]}> Create Account </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginContainer: {
        flex: 2,
        flexDirection: 'column',
        padding: 30,
        width: '100%',
    },
    header: {
        fontFamily: 'Arial',
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
        alignSelf: 'center'
    },
    textInputContainer: {
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 3,
        marginBottom: 25,
    },
    button: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 25
    },
    text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: 'blue',
    },
    loginText: {
        color: '#fff'
    }
});

export default LoginScreen
