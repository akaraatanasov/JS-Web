import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Catalog from './../appElements/Catalog'
import MyPosts from './../appElements/MyPosts'
import Submit from './../appElements/Submit'
import Details from './../appElements/Details'
import Logout from './userInfo/Logout'

let ViewComponent = () => {
    return (
        <Switch>
            <Route exact path='/' component={ Catalog } />
            <Route path='/logout' component={ Logout } />
            <Route path='/catalog' component={ Catalog } />
            <Route path='/submit' component={ Submit } />
            <Route path='/myPosts' component={ MyPosts } />
            <Route path='/details/:id' component={ Details } />
        </Switch>
    )
}

export default ViewComponent