import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import SignedIn from '../components/SignedIn'

export default class LoginScene extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo
                        onClick={()=>{}}
                    />
                </View>
                <View style={styles.formContainer}>
                    {store.isLoggedIn
                        ?
                        <LoginForm
                        onSubmit={(username, password)=>{}}
                        usrPlaceholder={"username"}
                        passPlaceholder={"password"}
                        loginBtnText={"Login"}
                    />
                        :
                    <SignedIn

                    />}
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