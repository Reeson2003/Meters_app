/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            number: 1
        };
        setInterval(()=>{
            this.setState({
                number: this.state.number - 1
            })
        }, 500)
    };

    buttonClick = () => {
        this.setState({
            number: this.state.number + 1
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Привет МИР!!!!!!!!!
                </Text>
                <Text style={{
                    backgroundColor: '#e8e420',
                    textAlign: 'center',
                    fontSize: 30,
                    color: 'green',
                    margin: 50,
                    padding: 10,
                    borderRadius: 10
                }}>
                    {this.state.number}
                </Text>
                <Button title={'Нажми меня'} onPress={this.buttonClick}></Button>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
