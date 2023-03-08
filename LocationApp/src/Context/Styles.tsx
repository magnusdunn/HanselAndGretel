import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 50
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
    },

    centerButton: {
        alignSelf: 'flex-end',
        marginTop: -700,
        // position: 'absolute',
        borderStyle: 'solid',
    },

    carButton: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        position: 'absolute',
        top: 53,
        height: 50,
        width: 50,
    },

    buttonIcon: {
        height: 45,
        width: 45,
        marginRight: 3,
    }
})


