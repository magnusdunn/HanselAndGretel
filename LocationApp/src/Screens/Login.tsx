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

const LoginScreen = ({ navigation }: { navigation: any }) => {

    return (
        <SafeAreaView style={styles.container}>
            {/* <View>
                <Image source={require('../assets/images/background.jpg')} />
            </View> */}
            <View style={styles.loginContainer}>
                <Text style={styles.header}>Login</Text>
                <View style={styles.textInputContainer}>
                    <TextInput placeholder='Username' />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={[styles.button, styles.loginButton]} >
                    <Text style={[styles.text, styles.loginText]}> Login </Text>
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
