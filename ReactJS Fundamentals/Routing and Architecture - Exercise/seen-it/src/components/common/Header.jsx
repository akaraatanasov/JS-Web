import React from 'react'
import Welcome from './userInfo/Welcome'
import Logout from './userInfo/Logout'

let Header = (props) => {
    return (
        <header>
            <span class="logo">☃</span><span class="header">SeenIt</span>
            { localStorage.username === '' ? <Welcome /> : <Logout /> }
        </header>
    )
}

export default Header