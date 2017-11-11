import React, { Component } from 'react';
import dataSource from '../services/dataSource';

export default class CommentsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Comments</h2>
                <ul>
                    {this.props.comments &&
                        this.props.comments.map((c, i) => (<li key={i}>{c}</li>))}
                </ul>
            </div>
        );
    }
}