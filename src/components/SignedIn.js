import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

const LoggedIn = (props) => (
    <View style={styles.container}>
        <Text style={styles.info}>{props.info}</Text>
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={props.onSignOut}
        >
            <Text style={styles.buttonText}>{props.signOutBtnText}</Text>
        </TouchableOpacity>
    </View>
);

export default LoggedIn;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        fontSize: 25,
        color: 'rgba(255,255,255,0.5)',
        padding: 20
    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        marginLeft: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 20,
        padding: 20
    }
});