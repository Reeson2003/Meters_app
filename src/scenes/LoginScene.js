import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import SignedIn from '../components/SignedIn'

const initialStore = {
    isOn: false,
    isLoggedIn: false,
    username: '',
    password: ''
};

export default class LoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = initialStore;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                isOn: !this.state.isOn
                            })
                        }}
                        title={'Meters app'}
                        isFlashOn={this.state.isOn}
                    />
                </View>
                <View style={styles.formContainer}>
                    {this.state.isLoggedIn
                        ?
                        <SignedIn
                            onSignOut={() => {
                                this.setState({
                                    ...this.state,
                                    isLoggedIn: false
                                })
                            }}
                            info={this.state.username}
                            signOutBtnText={'Sign out'}
                        />
                        :
                        <LoginForm
                            onSubmit={(username, password) => {
                                this.setState({
                                    ...this.state,
                                    isLoggedIn: true,
                                    username: username,
                                    password: password
                                })
                            }}
                            usrPlaceholder={"username"}
                            passPlaceholder={"password"}
                            loginBtnText={"Login"}
                        />}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131539',
    },
    logoContainer: {
        flex: 2
    },
    formContainer: {
        flex: 1
    },
});