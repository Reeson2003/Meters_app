import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import parse from '../services/meters_parser';
import request from '../services/meters_request';

const initialState = {
    login: '',
    password: ''
};

export default class LoginForm extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    loginPress = ()=>{
        request(this.state.login, this.state.password).then(
            function (success) {
                const result = parse(success);
                console.warn(result);
            },
            function (error) {
                console.warn(error);
            })
    };
    loginChanged = (text)=>{
        this.setState({
            ...this.state,
            login: text
        })
    };
    passwordChanged = (text)=>{
        this.setState({
            ...this.state,
            password: text
        })
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputsWrapper}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder={'username'}
                        onChangeText={this.loginChanged}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder={'password'}
                        secureTextEntry={true}
                        onChangeText={this.passwordChanged}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.loginPress}
                >
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