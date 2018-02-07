import React, {Component} from 'react'
// import {
//     View
// } from 'react-native'
import {Provider} from 'react-redux'
import Logo from './Logo'
import Store from '../reducers'

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Logo title={'Meters app'}/>
            </Provider>
        )
    }
}