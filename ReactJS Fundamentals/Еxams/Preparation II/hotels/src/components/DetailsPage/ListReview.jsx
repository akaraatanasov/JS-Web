import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListReview extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            rating: props.rating,
            comment: props.comment,
            user: props.user
        }
    }

    componentDidMount() {
        console.log('mounted');
        console.log(this.state);
    }

    render() {
        return (
            <article className="listReview">
                {console.log(this.state)}
                <h1>Rating: {this.state.rating}/5</h1>
                <p>{this.state.comment}</p>
                <br></br>
                <p>{this.state.user}</p>
            </article>
        );
    }
}