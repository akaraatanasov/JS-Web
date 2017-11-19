import React, { Component } from 'react';
import Input from '../common/Input';
import { login } from '../../api/remote';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        login(this.state.email, this.state.password)
            .then(res => {
                console.log(res)                
                if (res.success) {
                    localStorage.setItem('authToken', res.token);
                    this.props.history.push('/plan/2017');
                } else {
                    console.log('Enter data again');
                }
            })
    }

    
    render() {
        return (
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Login</h1>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="row space-top">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <Input
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeHandler}
                                        label="E-mail"
                                    />
                                </div>
                                <div className="form-group">
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