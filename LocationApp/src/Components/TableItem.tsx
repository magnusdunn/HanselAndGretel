import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

export type itemProps = {
    title: string;
    subtitle: string
}

const TableItem: React.FC<itemProps> = ({ item }) => {
    return (
        <View style={{ flexDirection: 'column', padding: 10, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={{ flexDirection: 'column', width: '85%' }}>
                    <Text> {item.title} </Text>
                    <Text style={{ fontSize: 10, color: '#ccc' }}> {item.subtitle} </Text>
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