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
        <View style={styles.buttonsWrapper}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={props.onSignOut}
            >
                <Text style={styles.buttonText}>{props.signOutBtnText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={props.onMetersPress}
            >
                <Text style={styles.buttonText}>Meters</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default LoggedIn;

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        flex:1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        color: 'rgba(255,255,255,0.5)'
    },
    buttonsWrapper: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonContainer: {
        flex:1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        margin: 10
    },
    buttonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 20,
        padding: 20
    }
});