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
    ListRenderItem
} from 'react-native';
//import { collection, query, where } from "firebase/firestore";

//import TableItem from '../components/TableItem';

interface ItemProps {
    title: string;
    subtitle: string
}

const data: ItemProps[] = [
    { title: "Joe Georger", subtitle: 'jgeorger' },
    { title: "Magnus Dunn", subtitle: 'mdunn' },
    { title: "Ron Cytron", subtitle: 'roncytron' },
]

const FriendsScreen = () => {

    const [filterData, setFilterData] = useState<ItemProps[]>([]);
    const [masterData, setMasterData] = useState<ItemProps[]>([]);
    const [search, setSearch] = useState<string>("");

    const searchFilter = (text: string) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const title = item.title ? item.title.toUpperCase() : "".toUpperCase()
                const subtitle = item.subtitle ? item.subtitle.toUpperCase() : "".toUpperCase()
                return (title.indexOf(text.toUpperCase()) > -1) || (subtitle.indexOf(text.toUpperCase()) > -1)
            });
            setFilterData(newData)
        } else {
            setFilterData(masterData)
        }
        setSearch(text)
    }

    const itemView: ListRenderItem<ItemProps> = ({ item }) => {
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

    /*const fetchUsers = () => {
        db = Firestore.firestore()
        usersRef = collection(db, "Users")
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
        //fetchUsers()
        setFilterData(data)
        setMasterData(data)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <Text> Start a trip </Text>
                <Text style={styles.selectedNav}> Find friends </Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='Username...'
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                />
            </View>
            <View style={styles.friendsContainer}>
                <Text style={styles.header}> Friends </Text>
                <FlatList
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={itemView}
                    ItemSeparatorComponent={itemSeparator}
                />

                {/* {
                    data.map((row, index) => (
                        <View
                            style={{flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1}}
                            key={index}
                        >
                            <TableItem title = {row.title} subtitle={row.subtitle} />
                        </View>
                    ))
                } */}

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
        fontFamily: 'Arial',
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

export default FriendsScreen