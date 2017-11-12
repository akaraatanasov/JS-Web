import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import dataCollector from './../../utils/dataCollector'
import reqHandler from './../../utils/reqHandler'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            fireRedirect: false
        }

        this.dataCollector = (e) => {
            this.setState(dataCollector(e))
        }

        this.Login = (e) => {
            e.preventDefault()

            this.setState({ loading: true })
            reqHandler.login(this.state)
                .then(res => {
                    localStorage.setItem('token', res._kmd.authtoken)
                    //localStorage.setItem('author', res.author)
                    //localStorage.setItem('username', res.author)
                    localStorage.setItem('username', res.username)
                    this.setState({ loading: false })
                    this.setState({ fireRedirect: true })
                })
        }
    }

    render() {
        const { fireRedirect } = this.state

        return ( /* onSubmit={ e => {this.Login(e)} } */
            <div>
                <form id="loginForm" onSubmit={this.Login}>
                    <h2>Sign In</h2>
                    <label>Username:</label>
                    <input onChange={(e) => {this.dataCollector(e)}} name="username" type="text" />
                    <label>Password:</label>
                    <input onChange={(e) => {this.dataCollector(e)}} name="password" type="password" />
                    <input id="btnLogin" value="Sign In" type="submit" />
                </form>
                {fireRedirect && (<Redirect to='/'/>)}
            </div>
        )
    }
}

export default Login