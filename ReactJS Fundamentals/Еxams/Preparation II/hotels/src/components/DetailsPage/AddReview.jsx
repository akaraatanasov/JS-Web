import React, { Component } from 'react';
import Input from '../common/Input';
import { createReview } from '../../api/remote';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            comment: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        createReview(Number(this.props.id), this.state.rating, this.state.comment)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container">
                <h3>Add your review</h3>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="rating"
                        type="number"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Rating"
                    />
                    <Input
                        name="comment"
                        value={this.state.location}
                        onChange={this.onChangeHandler}
                        label="Comment"
                    />
                    <input type="submit" className="btn btn-primary" value="Add" />
                </form>
            </div>
        );
    }
}