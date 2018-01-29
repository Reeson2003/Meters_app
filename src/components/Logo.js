import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
/* import Torch from 'react-native-torch';


export default class Logo extends Component {
    toggleFlash = () => {
        /!*const isOn = !this.state.isTorchOn;
        const props = this;
        Torch.switchState(isOn).then(function () {
            props.setState({isTorchOn: isOn});
        });*!/
        this.props.toggleFlash();
    };
    flashOffImg = require('../images/measureOff.png');
    flashOnImg = require('../images/measureOn.png');

    render() {
        const image = this.props.isFlashOn ? this.flashOnImg : this.flashOffImg;
        return (
            <View style={styles.logoContainer}>
                <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={this.toggleFlash}
                >
                    <Image
                        style={styles.logo}
                        source={image}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Meters app</Text>
            </View>
        );
    }
}*/

const flashOffImg = require('../images/measureOff.png');
const flashOnImg = require('../images/measureOn.png');

const Logo = (props) => (
    <View style={styles.logoContainer}>
        <TouchableOpacity
            style={styles.imageWrapper}
            onPress={props.onClick}
        >
            <Image
                style={styles.logo}
                source={props.isFlashOn ? flashOnImg : flashOffImg}
            />
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
    </View>
);

export default Logo;

const styles = StyleSheet.create({
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
});