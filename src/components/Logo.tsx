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
import {FlashState} from '../store/stateTypes'
import {DispatchProps} from '../actions/flashActions'

const flashOffImg = require('../images/measureOff.png')
const flashOnImg = require('../images/measureOn.png')


export type OwnProps = {
    title: string
}

export default class Logo extends Component<FlashState & DispatchProps & OwnProps> {
    toggleFlash = () => {

    }
    render() {
        return (
            <View style={styles.logoContainer}>
                <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={}
                >
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            opacity: this.props.isOn ? 0.6 : 0.1
                        }}
                        source={this.props.isOn ? flashOnImg : flashOffImg}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    };
};

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