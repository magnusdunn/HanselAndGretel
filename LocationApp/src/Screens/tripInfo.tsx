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

const TripInfoScreen = () => {

    const [name, setName] = useState<string>("")
    const [priv, setPriv] = useState<boolean>(false)

    const executePublicTrip = () => {
        if(name != ""){
            //stack navigator and pass props
            
        }
    }

    const executePrivTrip = () => {
        setPriv(true)
        if(name != ""){
            //stack navigator and pass props
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={{padding: 10, margin: 10}}>Name your trip</Text>
            <View style={styles.textInputContainer}>
                <TextInput 
                    placeholder='Walk around Forest Park...'
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <TouchableOpacity onPress={() => executePublicTrip} style={styles.button} >
                <Text style={[styles.text, {color: 'white'}]}> Start public trip </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => executePrivTrip} style={[styles.button, {backgroundColor: "green"}]} >
                <Text style={[styles.text, {color: 'white'}]}> Start private trip </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        width: '100%', 
        height: '100%', 
        padding: 20, 
        justifyContent: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 25,
        backgroundColor:'blue'
    },
    text: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
    textInputContainer: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingBottom: 3,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 15,
    }
});

export default TripInfoScreen