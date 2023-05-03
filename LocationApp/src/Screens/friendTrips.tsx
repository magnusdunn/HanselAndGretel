import {useState, useEffect} from 'react';
import {
SafeAreaView,
View,
Text,
StyleSheet,
Image,
TextInput,
TouchableOpacity,
FlatList,
ListRenderItem
} from 'react-native';
//import { collection, query, where } from "firebase/firestore";
//import { useNavigation } from '@react-navigation/native';

interface ItemProps  {
    tripID: number;
    title: string
}

const trips = [
    {tripID: 123456, title: "Forest Park Walk"},
    {tripID: 888888, title: "Run around campus"},
    {tripID: 100000, title: "Schnucks trip"}
]

const FriendsTrips = () => {

    const itemSeparator = () => {
        return(
            <View style={{height: 0.5, width: '100%', backgroundColor: "black"}} />
        );
    }

    const itemView: ListRenderItem<ItemProps> = ({item}) => {
        return (
            <TouchableOpacity onPress={() => handlePress(item.tripID)}>
            <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding: 10}}>
                <View style={{flexDirection: 'column', width: '85%'}}>
                    <Text> {item.title} </Text>
                </View>
                
                    {/* <Image source={require('../assets/images/enterarrow.png')} style={styles.arrow}/> */}
                
            </View>
            </TouchableOpacity>
        )
    }
    
    const handlePress = (tripID: number) => {
        //stack navigator
        //const navigation = useNavigation();
        //navigation.navigate('ShowTrip', { tripID });
        console.log(tripID)
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.navBar}>
            <Text> Trips </Text>
        </View>
        <View style={styles.friendsContainer}>
            <FlatList 
                data={trips}
                keyExtractor={(item, index) => index.toString()}
                renderItem={itemView}
                ItemSeparatorComponent={itemSeparator}
            />
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
    friendsContainer:{
        flexDirection: 'column',
        paddingTop: 30,
        padding: 10
    },
    header: {
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
    arrow: {
        width: 40,
        height: 20,
        resizeMode: 'contain',
    }
});

export default FriendsTrips