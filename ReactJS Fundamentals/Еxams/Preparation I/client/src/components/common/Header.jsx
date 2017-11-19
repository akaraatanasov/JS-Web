import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <header>
                <nav class="navbar navbar-dark bg-primary">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <Link className="navbar-brand" to="/">FS</Link>
                                <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
                                <NavLink className="nav-link" to="/create" activeClassName="active">Create Furniture</NavLink>
                                <NavLink className="nav-link" to="/profile" activeClassName="active">My Furniture</NavLink>
                                <NavLink className="nav-link" to="/logout" activeClassName="active">Logout</NavLink>
                                <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>
                                <NavLink className="nav-link" to="/register" activeClassName="active">Register</NavLink>
                                <span>72 items in catalog</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}