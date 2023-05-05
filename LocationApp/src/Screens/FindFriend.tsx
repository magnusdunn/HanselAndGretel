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
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getUID } from '../Memory/memoryAccess';
import {getUsers} from '../APIs/getUsers';
//import { collection, query, where } from "firebase/firestore";

//import TableItem from '../components/TableItem';

interface ItemProps {
    ID: string;
    UserName: string;
}

// const data: ItemProps[] = [
    // { title: "Joe Georger", subtitle: 'jgeorger' },
    // { title: "Magnus Dunn", subtitle: 'mdunn' },
    // { title: "Ron Cytron", subtitle: 'roncytron' },
// ]

const FriendsScreen = ({ navigation }: { navigation: any }) => {

    const [filterData, setFilterData] = useState<ItemProps[]>([]);
    const [masterData, setMasterData] = useState<ItemProps[]>([]);
    const [search, setSearch] = useState<string>("");
    // const [uid, setUID] = useState("");

    const searchFilter = (text: string) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const title = item.UserName ? item.UserName.toUpperCase() : "".toUpperCase()
                return (title.indexOf(text.toUpperCase()) > -1)
            });
            setFilterData(newData)
        } else {
            setFilterData(masterData)
        }
        setSearch(text)
    }

    const itemView: ListRenderItem<ItemProps> = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => (navigation.navigate('ShowTrip', {uid: item.ID}))}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                
                <View style={{ flexDirection: 'column', width: '85%' }}>
                    <Text> {item.UserName} </Text>
                </View>
                
                    {/* <Image source={require('../assets/images/enterarrow.png')} style={styles.arrow} /> */}
                
            </View>
            </TouchableOpacity>
        )
    }

    const itemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: "white" }} />
        );
    }

    async function getUsers(uid: string) {
        var ret:any = [];
        await firestore()
        .collection('Users')
        .get()
        .then(collectionSnapshot => {
            // console.log('Number of Documents: ', collectionSnapshot.size);
            collectionSnapshot.forEach(documentSnapshot => {
                
                var id = documentSnapshot.id; 
                console.log(id, uid);
                var d = JSON.stringify(documentSnapshot.data().UserName);
                // console.log(d);

                if(uid !== id){
                    var part = JSON.parse(`{"ID" : "${id}", "UserName": ${d}}`);
                    // console.log(part);
                    ret.push(part);
                }
                // console.log(ret);
                // console.log('Documaent Contents: ', documentSnapshot.id,
                //     documentSnapshot.data());
                });
        })
        .catch(error => {
            console.log(`Error: ${error}`)
        });
        // console.log(data)
        // const ret = JSON.parse(data.substring(0, data.length-1)+ "]");
        // console.log(ret);
        return ret;
    }

    async function fetchUsers() {
        const id = await getUID()
        const data = await getUsers(String(id));
        console.log("in fecth", data);
        
        await setMasterData(data);
        await setFilterData(data);
        console.log("masterData", masterData)
    }

    useEffect(() => {
        fetchUsers()
        // setFilterData(data)

        // setMasterData(data)
        // getUsers();
        // console.log("masterData", masterData)
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
                    // onPress = {() => navigation.navigate('friendsTrip')}
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