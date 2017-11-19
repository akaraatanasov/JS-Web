import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';

import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';

import HomePage from './components/HomePage/HomePage';
import CreatePage from './components/CreatePage/CreatePage';
import ListingPage from './components/ListingPage/ListingPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import NotFound from './components/common/NotFound'

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/create" component={CreatePage} />
                    <Route path="/list/:id" component={ListingPage} />
                    <Route path="/list" component={ListingPage} />
                    <Route path="/details/:id" component={DetailsPage} />
                    <Route path="/details" component={DetailsPage} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);