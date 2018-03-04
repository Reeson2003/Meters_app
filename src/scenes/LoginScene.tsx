import React, {Component} from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import Logo from '../containers/LogoContainer'
import LoginForm from '../containers/LoginFormContainer'

export class LoginScene extends Component {
    render() {
        console.warn('login scene')
        return <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logo title={'Meters app'}/>
            </View>
            <View style={styles.loginFormContainer}>
                <LoginForm
                    passPlaceholder={'password'}
                    usrPlaceholder={'username'}
                    loginBtnText={'Log in'}
                />
            </View>
        </View>
    }
}

type Styles = {
    container: StyleProp<ViewStyle>
    logoContainer: StyleProp<ViewStyle>
    loginFormContainer: StyleProp<ViewStyle>
}

const styles: Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        flex: 1
    },
    loginFormContainer: {
        flex: 1
    }
})