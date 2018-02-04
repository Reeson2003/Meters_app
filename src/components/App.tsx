import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'

export interface Props {
    text: string
}

export default class App extends Component<Props, null> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>hello world</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'green'
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        color: 'black',
    }
});