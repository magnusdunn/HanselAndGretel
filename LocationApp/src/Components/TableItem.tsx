import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

type itemProps = {
    title: string;
    subtitle: string
}

const TableItem = (props: itemProps) => {
    return (
        <View style={{ flexDirection: 'column', padding: 10, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={{ flexDirection: 'column', width: '85%' }}>
                    <Text> {props.title} </Text>
                    <Text style={{ fontSize: 10, color: '#ccc' }}> {props.subtitle} </Text>
                </View>
                {/* <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../assets/images/enterarrow.png')} style={styles.arrow} />
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    arrow: {
        width: 40,
        height: 20,
        resizeMode: 'contain',
    }
});

export default TableItem;