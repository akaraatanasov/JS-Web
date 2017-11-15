import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'
import actions from './../../store/actions/action'
import fetcher from './../../store/actions/fetcher'

class Auth extends Component {
    constructor() {
        super()

        this.state = {
            login: true
        }

        this.dataCollector = this.dataCollector.bind(this)
    }

    dataCollector = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    loginState = () => {
        this.setState({login: !this.state.login})
    }

    render() {
        if (this.state.login) {
            return (<Login viewFunc={this.loginState} dataFunc={this.dataCollector}/>)
        } else {
            return (<Register userProps={this.state} viewFunc={this.loginState} dataFunc={this.dataCollector}/>)
        }
    }
}

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerFunc: () => dispatch(fetcher(this.state))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)