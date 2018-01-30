import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Text
} from 'react-native'

export default class LoginForm extends Component<{}> {
    state = {
        username: '',
        password: ''
    };
    loginPress = () => {
        this.props.onSubmit(this.state.username, this.state.password);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputsWrapper}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder={this.props.usrPlaceholder}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        returnKeyType={'next'}
                        onSubmitEditing={()=>{this.passwordInput.focus()}}
                        value={this.state.username}
                        onChangeText={username => this.setState({username})}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder={this.props.passPlaceholder}
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        ref={(el)=>{this.passwordInput = el}}
                        returnKeyType={'go'}
                        onSubmitEditing={this.loginPress}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.loginPress}
                >
                    <Text style={styles.buttonText}>{this.props.loginBtnText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

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
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        marginLeft: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 20
    }
});