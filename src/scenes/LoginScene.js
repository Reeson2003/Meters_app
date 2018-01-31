import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import SignedIn from '../components/SignedIn';
import Flash from '../domain/Flash';
import Meters from '../domain/Meters';

const initialState = {
    isOn: false,
    isLoggedIn: false,
    username: '',
    password: '',
    data: {},
    user: ''
};

export default class LoginScene extends Component {
    meters;
    state = initialState;

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo
                        onClick={() => {
                            const on = !this.state.isOn;
                            new Flash().toggle(on)
                                .then(() => {
                                    this.setState({
                                        ...this.state,
                                        isOn: on
                                    });
                                });
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
                                if (this.meters) {
                                    this.meters.signOut()
                                        .then(() => {
                                            this.setState({
                                                ...this.state,
                                                isLoggedIn: false
                                            });
                                            this.meters = null;
                                        })
                                        .catch((error)=>{
                                            console.warn(error);
                                        })
                                }
                            }}
                            onMetersPress={() => {
                                console.warn(this.state.data);
                            }}
                            info={this.state.user}
                            signOutBtnText={'Sign out'}
                        />
                        :
                        <LoginForm
                            onSubmit={(username, password) => {
                                new Meters(username, password)
                                    .then((meters) => {
                                        this.meters = meters;
                                        this.setState({
                                            ...this.state,
                                            isLoggedIn: true,
                                            username: username,
                                            password: password,
                                            data: meters.data,
                                            user: meters.data.username
                                        });
                                    })
                                    .catch((error)=>{
                                        console.warn(error);
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
        backgroundColor: '#0a3d62',
    },
    logoContainer: {
        flex: 2
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});