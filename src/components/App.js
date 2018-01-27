import React, {Component} from 'react';
import {
    View
} from 'react-native';
import Splash from './Splash'
import Login from './Login'


export default class App extends Component<{}> {
    render() {
        return (
            <Login/>
        )
    }
}