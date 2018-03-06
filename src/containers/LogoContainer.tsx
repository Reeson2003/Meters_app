import * as React from 'react'
import {Component} from 'react'
import Logo from '../components/Logo'
import {FlashState} from '../store/stateTypes'
import toggle from '../domain/Flash'
import {FlashDispatchProps, mapDispatchToProps, mapStateToProps} from '../actions/flashActions'
import {connect} from 'react-redux'

const FLASH_OFF_IMG_URL = '../images/measureOff.png'
const FLASH_ON_IMG_URL = '../images/measureOn.png'
const FLASH_ERR_IMG_URL = '../images/measureErr.png'

class LogoContainer extends Component<FlashState & FlashDispatchProps & { title: string }> {
    private imgUrl = this.props.error === undefined ? (this.props.isOn ? FLASH_ON_IMG_URL : FLASH_OFF_IMG_URL) : FLASH_ERR_IMG_URL
    private imgOpc = !this.props.isOn ? 0.1 : 0.7
    render() {
        return <Logo
            title={this.props.title}
            onClick={this.toggleFlash}
            imageUrl={this.imgUrl}
            imgOpacity={this.imgOpc}
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