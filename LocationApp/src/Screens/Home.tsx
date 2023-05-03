import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    ListRenderItem,
    Button
} from 'react-native';

interface TripProps {
    title: string,
    subtitle: string
}

const data: TripProps[] = [
    { title: 'Forest Park', subtitle: 'My Trip' },
    { title: '6300 Enright Ave', subtitle: 'Joe' },
    { title: 'Olin Library', subtitle: 'Magnus' }
]

const HomeScreen = ({ navigation }: { navigation: any }) => {

    const [tripData, setTripData] = useState<TripProps[]>([])

    /*const fetchUsers = () => {
        db = Firestore.firestore()
        usersRef = collection(db, "Test/TestUser/trips")
        collectionRef.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setMasterData(doc.data())
            });
        });
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
    }*/

    useEffect(() => {
        setTripData(data)
    }, [])

    const itemView: ListRenderItem<TripProps> = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={{ flexDirection: 'column', width: '85%' }}>
                    <Text> {item.title} </Text>
                    <Text style={{ fontSize: 10, color: '#ccc' }}> {item.subtitle} </Text>
                </View>
                <TouchableOpacity onPress={() => { }}>
                    {/* <Image source={require('../assets/images/enterarrow.png')} style={styles.arrow} /> */}
                </TouchableOpacity>
            </View>
        )
    }

    const itemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: "white" }} />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <Button title="Find Friends" onPress={() => navigation.navigate("Friends")} />
            </View>
            <View style={styles.textInputContainer}>
                <TextInput placeholder='Where to...' />
            </View>
            <View style={{ width: '100%', height: 80 }} />
            <TouchableOpacity onPress={() => navigation.navigate("Map")} style={styles.button} >
                <Text style={[styles.text, { color: 'white' }]}> Start trip </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.tripsContainer}>
                <Text style={styles.header}> Past trips </Text>
                <FlatList
                    data={tripData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={itemView}
                    ItemSeparatorComponent={itemSeparator}
                />
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.logout} >
                <Text style={[styles.text, { color: 'white' }]}> Logout </Text>
            </TouchableOpacity> */}

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
        fontFamily: 'Arial',
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
    arrow: {
        width: 40,
        height: 20,
        resizeMode: 'contain',
    },

    logout: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 25,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
    }
});

export default HomeScreen