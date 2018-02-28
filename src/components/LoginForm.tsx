import * as React from 'react'
import {Component} from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'

export default class LoginForm extends Component {
    render() {
        return <View style={styles.container}>

        </View>
    }
}

type Styles = {
    container: StyleProp<ViewStyle>
}

const styles: Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})