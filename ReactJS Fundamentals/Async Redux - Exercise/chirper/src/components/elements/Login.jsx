import React from 'react'

let Login = (props) => {
    return(
        <form id="formLogin" class="form">
            <label>Username</label>
            <input onChange={(e) => props.dataFunc(e)} name="username" type="text"/>
            <label>Password</label>
            <input onChange={(e) => props.dataFunc(e)} name="password" type="password"/>
            <input id="btnLogin" value="Sign In" type="submit"/>
            <button onClick={() => props.viewFunc()}>Register</button>
        </form>
    )
}

export default Login