import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <NavLink className="nav-link" exact to="/plan/2017/11" activeClassName="active">Monthly Balance</NavLink>
                                <NavLink className="nav-link" exact to="/plan/2017" activeClassName="active">Yearly Balance</NavLink>
                                {loggedIn && <a className="nav-link"  href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                                {!loggedIn && <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink className="nav-link" to="/register" activeClassName="active">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}