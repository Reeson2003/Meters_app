import React from 'react'
import {StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle} from 'react-native'

export type MeterProps = {
    name: string,
    previousValue: number,
    currentValue: number,
    editEnabled: boolean
    onSubmit: () => void
    onChanged: (value: string) => void
    reference: (component: any) => void
}

const meter = (props: MeterProps) => (
    <View style={styles.container}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.previous}>{props.previousValue.toString()}</Text>
        <TextInput
            style={styles.current}
            value={props.currentValue.toString()}
            editable={props.editEnabled}
            onChangeText={props.onChanged}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            onSubmitEditing={props.onSubmit}
            keyboardType={'numeric'}
            ref={props.reference}
        />
    </View>
)

type Styles = {
    container: StyleProp<ViewStyle>,
    name: StyleProp<TextStyle>,
    previous: StyleProp<TextStyle>,
    current: StyleProp<TextStyle>
}

const styles: Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    name: {
        flex: 1
    },
    previous: {
        flex: 1
    },
    current: {
        flex: 1
    }
})

export default meter