import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

const LoggedIn = (onSignOut, info, signOutBtnText)=>{
    <View style={styles.container}>
        <Text style={styles.info}>{info}</Text>
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onSignOut}
        >
            <Text style={styles.buttonText}>{signOutBtnText}</Text>
        </TouchableOpacity>
    </View>
};

export default LoggedIn;

const styles = StyleSheet.create({
    container:{

    },
    info:{

    },
    buttonContainer:{

    },
    buttonText:{

    }
});