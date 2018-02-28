///<reference path="../../node_modules/@types/react-native/index.d.ts"/>
import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ViewStyle,
    StyleProp,
    ImageStyle,
    TextStyle
} from 'react-native'

/* tslint:disable-next-line:no-var-requires */
const flashOffImg = require('../images/measureOff.png')
/* tslint:disable-next-line:no-var-requires */
const flashOnImg = require('../images/measureOn.png')
/* tslint:disable-next-line:no-var-requires */
const flashErrImg = require('../images/measureErr.png')

export type LogoProps = {
    title: string,
    onClick: () => void,
    flashIsOn: boolean,
    error: boolean
}

export default class Logo extends Component<LogoProps> {
    render() {
        let img = flashOffImg
        let opc = 0.1
        if (this.props.flashIsOn) {
            img = flashOnImg
            opc = 0.7
        }
        if (this.props.error) {
            img = flashErrImg
            opc = 0.7
        }
        return (
            <View style={styles.logoContainer}>
                <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={this.props.onClick}
                >
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            opacity: opc
                        }}
                        source={img}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    }
}

type Styles = {
    logoContainer: StyleProp<ViewStyle>,
    imageWrapper: StyleProp<ViewStyle>,
    logo: StyleProp<ImageStyle>,
    title: StyleProp<TextStyle>
}

const styles: Styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    imageWrapper: {},
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
})