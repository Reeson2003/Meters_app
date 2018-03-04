import React, {Component} from 'react'
import LoginForm from '../components/LoginForm'
import {SiteState} from '../store/stateTypes'
import {SiteDispatchProps} from '../actions/siteActions'
import getLoader from '../domain/Loader'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from '../actions/siteActions'

class LoginFormContainer extends Component<SiteState & SiteDispatchProps & {usrPlaceholder: string, passPlaceholder: string, loginBtnText: string}> {
    loadData = (username: string, password: string): void => {
        this.props.onLoadRequest()
        getLoader(username, password)
            .then(loader => loader.getMeters())
            .then(meters => this.props.onLoadSuccess({
                    userFullName: 'no data',
                    session: 'no data',
                    meters: meters
                }))
            .catch(e => this.props.onLoadError(e))
    }
    render() {
        return <LoginForm
            onSubmit={this.loadData}
            usrPlaceholder={this.props.usrPlaceholder}
            passPlaceholder={this.props.passPlaceholder}
            loginBtnText={this.props.loginBtnText}
        />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)