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
import {connect} from 'react-redux'
import {FlashState} from '../store/stateTypes'
import {DispatchProps} from '../actions/flashActions'
import {mapStateToProps} from '../actions/flashActions'
import {mapDispatchToProps} from '../actions/flashActions'
import toggleFlash from '../domain/Flash'

/* tslint:disable-next-line:no-var-requires */
const flashOffImg = require('../images/measureOff.png')
/* tslint:disable-next-line:no-var-requires */
const flashOnImg = require('../images/measureOn.png')
/* tslint:disable-next-line:no-var-requires */
const flashErrImg = require('../images/measureErr.png')

export type OwnProps = {
    title: string
}

class Logo extends Component<FlashState & DispatchProps & OwnProps> {
    toggleFlash = () => {
        if (!this.props.error) {
            toggleFlash(!this.props.isOn)
                .then(() => {
                    this.props.onToggle()
                    this.props.onStopLoading()
                })
                .catch((error) => {
                    this.props.onError(error)
                    this.props.onStopLoading()
                })
            this.props.onStartLoading()
        }
    }

    render() {
        let img = flashOffImg
        let opc = 0.1
        if (this.props.isOn) {
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
                    onPress={this.toggleFlash}
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

export default connect(mapStateToProps, mapDispatchToProps)(Logo)