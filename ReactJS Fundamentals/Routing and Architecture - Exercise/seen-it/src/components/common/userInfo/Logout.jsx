import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import dataCollector from './../../../utils/dataCollector'
import reqHandler from './../../../utils/reqHandler'

class Logout extends Component {
    constructor() {
        super()

        this.state = {
            fireRedirect: false
        }

        this.dataCollector = (e) => {
            this.setState(dataCollector(e))
        }

        this.Logout = (e) => {
            console.log(e)

            this.setState({ loading: true })
            reqHandler.logout(localStorage.token)
                .then(res => {
                    localStorage.setItem('token', '')
                    localStorage.setItem('username', '')
                    this.setState({ loading: false })
                    this.setState({ fireRedirect: true })
                })
        }
    }

    render() {
        const { fireRedirect } = this.state

        return (
            <div>
                <div id="profile"><span>{localStorage.username}</span>|<Link to="/" onClick={this.Logout}>logout</Link></div>
                {fireRedirect && (<Redirect to='/'/>)}
            </div>
        )
    }
}

export default Logout