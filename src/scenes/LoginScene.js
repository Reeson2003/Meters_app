import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../containers/LogoContainer';
import LoginForm from '../containers/LoginFormContainer';
export class LoginScene extends Component {
    render() {
        console.warn('login scene');
        return React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.logoContainer },
                React.createElement(Logo, { title: 'Meters app' })),
            React.createElement(View, { style: styles.loginFormContainer },
                React.createElement(LoginForm, { passPlaceholder: 'password', usrPlaceholder: 'username', loginBtnText: 'Log in' })));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        flex: 1
    },
    loginFormContainer: {
        flex: 1
    }
});
//# sourceMappingURL=LoginScene.js.map