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
import Flash from '../domain/Flash'

/* tslint:disable-next-line:no-var-requires */
const flashOffImg = require('../images/measureOff.png')
/* tslint:disable-next-line:no-var-requires */
const flashOnImg = require('../images/measureOn.png')

export type OwnProps = {
    title: string
}

class Logo extends Component<FlashState & DispatchProps & OwnProps> {
    toggleFlash = () => {
        Flash.toggle(!this.props.isOn)
            .then((isOn: boolean) => {
                if (isOn) {
                    this.props.onToggle()
                } else
                    this.props.onError('Unknown error')
                this.props.onStopLoading()
            })
            .catch((error) => {
                this.props.onError(error)
                this.props.onStopLoading()
            })
        this.props.onStartLoading()
    }

    render() {
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
                            opacity: this.props.isOn ? 0.6 : 0.1
                        }}
                        source={this.props.isOn ? flashOnImg : flashOffImg}
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