import * as React from 'react'
import {Component} from 'react'
import Logo from '../components/Logo'
import {FlashState} from '../store/stateTypes'
import toggle from '../domain/Flash'
import {FlashDispatchProps, mapDispatchToProps, mapStateToProps} from '../actions/flashActions'
import {connect} from 'react-redux'

class LogoContainer extends Component<FlashState & FlashDispatchProps & { title: string }> {
    render() {
        return <Logo
            title={this.props.title}
            onClick={this.toggleFlash}
            flashIsOn={this.props.isOn}
            error={this.props.error === undefined}
        />
    }

    toggleFlash = () => {
        toggle(!this.props.isOn)
            .then(this.props.onToggleSuccess)
            .catch(e => this.props.onToggleError(e))
        this.props.onToggleRequest()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoContainer)