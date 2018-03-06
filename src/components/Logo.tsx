///<reference path="../../node_modules/@types/react-native/index.d.ts"/>
import React from 'react'
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

export type LogoProps = {
    title: string,
    onClick: () => void,
    imageUrl: string,
    imgOpacity: number
}

const logo = (props: LogoProps) => (
    <View style={styles.logoContainer}>
        <TouchableOpacity
            style={styles.imageWrapper}
            onPress={props.onClick}
        >
            <Image
                style={{
                    width: 100,
                    height: 100,
                    opacity:  props.imgOpacity
                }}
                source={require(props.imageUrl)}
            />
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
    </View>
)

export default logo

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