import React, { Component } from 'react';
import Input from '../common/Input';
import { login } from '../../api/remote';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false,
            submitting: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        this.setState({submitting: true});

        const loginData = {
            email: this.state.email,
            password: this.state.password
        };

        const error = { message: '', errors: {}};
        if (loginData.email.length < 1) {
            error.message = 'E-mail cannot be empty';
            error.errors.description = 'Enter a valid email';
        }

        if (loginData.password.length < 4) {
            error.message = 'Invalid password';
            error.errors.password = 'Password must be at least 4 characters long';
        }

        if (error.message) {
            this.setState({error, submitting: false});
            return;
        }

        this.setState({ error: false });
        const res = login(loginData);

        if (!res.success) {
            this.setState({ error: res, submitting: false });
            return;
        }
        this.setState({ submitting: false });        
        this.props.history.push('/');

        /*
        login(this.state.email, this.state.password)
            .then(res => {
                console.log(res)
                localStorage.setItem('authToken', res.token);
                this.props.history.push('/'); // redirects
            })
        */
    }

    render() {
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(k => {
                        return <p key={k}>{this.state.error.errors[k]}</p>;
                    })}
                </div>
            );
        }

        return (
            <main>
                <div class="container">
                    <div class="row space-top">
                        <div class="col-md-12">
                            <h1>Login</h1>
                        </div>
                    </div>
                    {errors}
                    <form onSubmit={this.onSubmitHandler}>
                        <div class="row space-top">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <Input
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeHandler}
                                        label="E-mail"
                                    />
                                </div>
                                <div class="form-group">
                                    <Input
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChangeHandler}
                                        label="Password"
                                    />
                                </div>
                                <input type="submit" className="btn btn-secondary" value="Login" />
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}