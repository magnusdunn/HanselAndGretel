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

import TableItem from '../Components/TableItem';

const data = [
    { title: "Joe Georger", subtitle: 'jgeorger' },
    { title: "Magnus Dunn", subtitle: 'mdunn' },
    { title: "Ron Cytron", subtitle: 'roncytron' },
]

const FriendsScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <Text> Start a trip </Text>
                <Text style={styles.selectedNav}> Find friends </Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput placeholder='Username...' />
            </View>
            <View style={styles.friendsContainer}>
                <Text style={styles.header}> Friends </Text>
                {
                    data.map((row, index) => (
                        <View
                            style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1 }}
                            key={index}
                        >
                            <TableItem item={row} />
                        </View>
                    ))
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 50
    },
    navBar: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20,
    },
    selectedNav: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    friendsContainer: {
        flexDirection: 'column',
        paddingTop: 30,
        padding: 10
    },
    header: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,

    },
    textInputContainer: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingBottom: 3,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 15,
    },
    text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default FriendsScreen