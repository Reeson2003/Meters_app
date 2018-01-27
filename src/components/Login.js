import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import Torch from 'react-native-torch';
import LoginForm from './LoginForm'

const initialState = {
    isTorchOn: false
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    switchTorch =()=>{
        const isOn = !this.state.isTorchOn;
        const props = this;
        Torch.switchState(isOn).then(function () {
            props.setState({isTorchOn: isOn});
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <TouchableOpacity
                        style={styles.imageWrapper}
                        onPress={this.switchTorch}
                    >
                        <Image
                            style={styles.logo}
                            source={require('../images/measure.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Meters app</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    formContainer: {},
    imageWrapper:{

    },
    logo: {
        width: 100,
        height: 100,
        opacity: 0.5
    },
    title: {
        fontSize: 35,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 10,
        opacity: 0.5
    }
});