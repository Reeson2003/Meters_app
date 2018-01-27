import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'


export default class Splash extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Meters app</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Powered by react-native</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#786fa6',
        flex: 1,
        alignItems: 'center'
    },
    label: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    labelWrapper: {
        justifyContent:'center',
        flex:1
    },
    subtitle: {
        color: 'white',
        fontWeight: '200',
        paddingBottom: 20
    }
});