import React from 'react'
import {connect} from 'react-redux'
import fetcher from './../../store/actions/fetcher'

let executeSubmit = (e, payload, func) => {
    e.preventDefault()
    delete payload.login
    func(payload)
}

let Register = (props) => {
    return(
        <form onSubmit={(e) => {
            e.preventDefault()
            props.registerFunc(props.userProps)
        }} class="form" id="formRegister">
        {console.log(props.userProps)}
            <label>Username</label>
            <input onChange={(e) => props.dataFunc(e)} name="username" type="text"/>
            <label>Password</label>
            <input onChange={(e) => props.dataFunc(e)} name="password" type="password"/>
            <label>Repeat Password</label>
            <input onChange={(e) => props.dataFunc(e)} name="repeatPass" type="password"/>
            <input id="btnRegister" value="Register" type="submit"/>
            <button onClick={() => props.viewFunc()}>Log in</button>
        </form>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)