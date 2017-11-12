import React, { Component } from 'react'
import dataCollector from './../../utils/dataCollector'
import reqHandler from './../../utils/reqHandler'

class Register extends Component {
    constructor() {
        super()

        this.dataCollector = (e) => {
            this.setState(dataCollector(e))
        }

        this.Register = (e) => {
            e.preventDefault()

            this.setState({ loading: true })
            reqHandler.register(this.state)
                .then(res => {
                    localStorage.setItem('token', res._kmd.authtoken)
                    localStorage.setItem('username', res.username)
                    this.setState({ loading: false })
                })
        }
    }

    render() {
        return (
            <form id="registerForm" onSubmit={ e => {this.Register(e)} }> 
                <h2>Register</h2>
                <label>Username:</label>
                <input onChange={(e) => {this.dataCollector(e)}} name="username" type="text" />
                <label>Password:</label>
                <input onChange={(e) => {this.dataCollector(e)}} name="password" type="password" />
                <label>Repeat Password:</label>
                <input onChange={(e) => {this.dataCollector(e)}} name="repeatPass" type="password" />
                <input id="btnRegister" value="Sign Up" type="submit" />
            </form>
        )
    }
}

export default Register