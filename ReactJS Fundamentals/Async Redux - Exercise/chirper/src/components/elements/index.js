import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './Auth'
import Home from './Home'

let ElementBlender = (props) => {
    //if (props.store.auth.username === '') {
    if (Object.keys(props.store.auth).length === 0) {
        return (
            <Switch>
                <Route exact path='/' component={Auth}/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path='/' component={Home}/>
        </Switch>
    )   
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

export default connect(mapStateToProps, null)(ElementBlender)