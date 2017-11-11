import React, { Component } from 'react';

let ManagedInput = {};

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { name: '', password: '' };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        ManagedInput = withHandler(Input, this.onChange);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.name, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                Name:
                <ManagedInput
                    type="text"
                    name="name"
                    value={this.state.name}/><br />
                Password:
                <ManagedInput
                    type="password"
                    name="password"
                    value={this.state.password}/>
                <input type="submit" value="Login" />
            </form>
        );
    }
}

function withHandler(WrappedComponent, changeHandler) {
    class ManagedInput extends Component {
        render() {
            return (<WrappedComponent
                onChange={changeHandler}
                type={this.props.type}
                name={this.props.name}
                value={this.props.value} />);
        }
    }

    return ManagedInput;
}

function Input(props) {
    return (
        <input
            onChange={props.onChange}
            type={props.type}
            name={props.name}
            value={props.value} />
    );
}