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
            <View>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center'
    }
})