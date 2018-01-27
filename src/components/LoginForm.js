import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Text
} from 'react-native'


export default class LoginForm extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputsWrapper}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder={'username'}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder={'password'}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        padding: 20
    },
    inputsWrapper:{
        flex: 3,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 20,
        height: 40,
        color: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 20,
        fontSize: 15
    },
    buttonContainer:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#778beb',
        marginBottom: 20,
        marginLeft:10
    },
    buttonText: {
        textAlign:'center',
        color:'rgba(0,0,0,0.5)',
        fontSize: 20
    }
});