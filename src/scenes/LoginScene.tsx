import React, {Component} from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm'

export class LoginScene extends Component {
    render() {
        console.warn('login scene')
        return <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logo
                    title={'Meters app'}
                    onClick={() => console.warn('Logo clicked')}
                    imageUrl={'../images/measureOn.png'}
                    imgOpacity={0.7}
                />
            </View>
            <View style={styles.loginFormContainer}>
                <LoginForm
                    passPlaceholder={'password'}
                    usrPlaceholder={'username'}
                    loginBtnText={'Log in'}
                    onSubmit={(username: string, password: string) => {console.warn(`Log in clicked: ${username}, ${password}`)}}
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