import React, {Component} from 'react'
import {Provider} from 'react-redux'
import Logo from '../containers/LogoContainer'
import Store from '../store/index'

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Logo title={'Meters app'}/>
            </Provider>
        )
    }
}