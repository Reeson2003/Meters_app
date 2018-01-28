import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import LoginForm from './LoginForm';
import Logo from './Logo';

export default class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo/>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303952',
    },
    logoContainer: {
        flex: 1
    },
    formContainer: {},
});