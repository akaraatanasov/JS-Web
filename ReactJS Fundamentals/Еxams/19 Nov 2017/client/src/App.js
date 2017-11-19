import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import NotFound from './components/common/NotFound'
import PrivateRoute from './components/common/PrivateRoute';

import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';

import YearlyBalance from './components/Yearly/YearlyBalance';
import MonthlyBalance from './components/Monthly/MonthlyBalance';
import AddExpense from './components/Monthly/AddExpense';

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
                    <PrivateRoute exact path="/" component={LoginPage} />
                    <PrivateRoute path="/plan/:year/:month/expence" component={AddExpense} />
                    <PrivateRoute path="/plan/:year/:month" component={MonthlyBalance} />
                    <PrivateRoute path="/plan/:year" component={YearlyBalance} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);