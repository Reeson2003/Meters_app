import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {PropTypes} from "react-redux";

const flashOffImg = require('../images/measureOff.png');
const flashOnImg = require('../images/measureOn.png');

const Logo = (props) => {
    return (<View style={styles.logoContainer}>
        <TouchableOpacity
            style={styles.imageWrapper}
            onPress={props.onClick}
        >
            <Image
                style={{
                    width: 100,
                    height: 100,
                    opacity: props.isFlashOn ? 0.6 : 0.1
                }}
                source={props.isFlashOn ? flashOnImg : flashOffImg}
            />
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
    </View>);
};

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

Logo.propTypes = {
    onClick: PropTypes.func.isRequired,
    isFlashOn: PropTypes.boolean.isRequired,
    title: PropTypes.string.isRequired
};