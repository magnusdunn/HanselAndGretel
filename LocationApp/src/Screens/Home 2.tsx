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

const HomeScreen = () => {

    const data = [
        { title: 'Forest Park', subtitle: 'My Trip' },
        { title: '6300 Enright Ave', subtitle: 'Joe' },
        { title: 'Olin Library', subtitle: 'Magnus' }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <Text style={styles.selectedNav}> Start a trip </Text>
                <Text> Find friends </Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput placeholder='Where to...' />
            </View>
            <View style={{ width: '100%', height: 80 }} />
            <TouchableOpacity onPress={() => { }} style={styles.button} >
                <Text style={[styles.text, { color: 'white' }]}> Start trip </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.tripsContainer}>
                <Text style={styles.header}> Past trips </Text>
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
    )
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
    divider: {
        padding: 2,
        backgroundColor: '#ccc',
        height: 5,
        width: '100%'
    },
    tripsContainer: {
        flexDirection: 'column',

        paddingTop: 30,
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
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 3,
        marginBottom: 25,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 25,
        backgroundColor: 'blue'
    },
    text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default HomeScreen