import React, {Component} from 'react'
import {Meters} from '../domain/Types'
import {View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity} from 'react-native'
import Meter from './Meter'

export type CurrentMeters = {
    water: number,
    gas: number,
    electricityDay: number,
    electricityNight: number
}

export type MetersFormProps = {
    names: {
        water: string,
        gas: string,
        electricityDay: string,
        electricityNight: string
        submitButton: string
    }
    meters: Meters,
    onSubmit: (currentMeters: CurrentMeters) => void
}

export default class MetersForm extends Component<MetersFormProps, CurrentMeters> {
    state: CurrentMeters = {
        water: this.props.meters.water.current,
        gas: this.props.meters.gas.current,
        electricityDay: this.props.meters.electricity.day.current,
        electricityNight: this.props.meters.electricity.night.current
    }
    private waterInput
    private gasInput
    private electricityDayInput
    private electricityNightInput

    render() {
        return (
            <View style={styles.container}>
                <Meter
                    name={this.props.names.water}
                    reference={(component) => {
                        this.waterInput = component
                    }}
                    previousValue={this.props.meters.water.previous}
                    currentValue={this.state.water}
                    editEnabled={this.props.meters.editable}
                    onChanged={(value: string) => {
                        this.setState({
                            ...this.state,
                            water: this.processValue(value)
                        })
                    }}
                    onSubmit={() => {
                        this.gasInput.focus()
                    }}
                />
                <Meter
                    name={this.props.names.gas}
                    reference={(component) => {
                        this.gasInput = component
                    }}
                    previousValue={this.props.meters.gas.previous}
                    currentValue={this.state.gas}
                    editEnabled={this.props.meters.editable}
                    onChanged={(value: string) => {
                        this.setState({
                            ...this.state,
                            gas: this.processValue(value)
                        })
                    }}
                    onSubmit={() => {
                        this.electricityDayInput.focus()
                    }}
                />
                <Meter
                    name={this.props.names.electricityDay}
                    reference={(component) => {
                        this.electricityDayInput = component
                    }}
                    previousValue={this.props.meters.electricity.day.previous}
                    currentValue={this.state.electricityDay}
                    editEnabled={this.props.meters.editable}
                    onChanged={(value: string) => {
                        this.setState({
                            ...this.state,
                            electricityDay: this.processValue(value)
                        })
                    }}
                    onSubmit={() => {
                        this.electricityNightInput.focus()
                    }}
                />
                <Meter
                    name={this.props.names.electricityNight}
                    reference={(component) => {
                        this.electricityNightInput = component
                    }}
                    previousValue={this.props.meters.electricity.night.previous}
                    currentValue={this.state.electricityNight}
                    editEnabled={this.props.meters.editable}
                    onChanged={(value: string) => {
                        this.setState({
                            ...this.state,
                            electricityNight: this.processValue(value) || this.state.electricityNight
                        })
                    }}
                    onSubmit={() => {
                        this.submitInput()
                    }}
                />
                <TouchableOpacity style={styles.button}>
                    {this.props.names.submitButton}
                </TouchableOpacity>
            </View>
        )
    }

    private submitInput = () => {
        this.props.onSubmit(this.state)
    }

    private processValue = (value: string): number => {
        try {
            return Number.parseInt(value)
        } catch (e) {
            return undefined
        }
    }
}

type Styles = {
    container: StyleProp<ViewStyle>,
    button: StyleProp<ViewStyle>
}

const styles: Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        flex: 1
    }
})