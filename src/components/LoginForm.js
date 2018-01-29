import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Text
} from 'react-native'

/*export default class LoginForm extends Component<{}> {
    loginPress = () => {
        /!*request(this.state.login, this.state.password).then(
            function (success) {
                const result = parse(success);
                console.warn(result);
            },
            function (error) {
                console.warn(error);
            })*!/
        this.props.login(this.username, this.password);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputsWrapper}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder={'username'}
                        ref={node => {
                            this.username = node
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder={'password'}
                        secureTextEntry={true}
                        ref={node => {
                            this.password = node
                        }}
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
}*/

const LoginForm =({onSubmit, usrPlaceholder, passPlaceholder, loginBtnText})=>{
    <View style={styles.container}>
        <View style={styles.inputsWrapper}>
            <TextInput
                style={styles.input}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                placeholder={usrPlaceholder}
                ref={node => {
                    this.username = node
                }}
            />
            <TextInput
                style={styles.input}
                underlineColorAndroid={'rgba(0,0,0,0)'}
                placeholder={passPlaceholder}
                secureTextEntry={true}
                ref={node => {
                    this.password = node
                }}
            />
        </View>
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={()=>{onSubmit(this.username, this.password)}}
        >
            <Text style={styles.buttonText}>{loginBtnText}</Text>
        </TouchableOpacity>
    </View>
};

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20
    },
    inputsWrapper: {
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
    buttonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#778beb',
        marginBottom: 20,
        marginLeft: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 20
    }
});