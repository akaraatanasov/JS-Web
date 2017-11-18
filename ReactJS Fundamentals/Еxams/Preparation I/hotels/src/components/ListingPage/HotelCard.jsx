import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HotelCard extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            name: props.name,
            image: props.image,
            location: props.location,
            id: props.id,
            canDelete: props.canDelete,
            del: props.del 
        }
    }

    render() {
        return (
            <article className="hotelCard">
                <img alt={this.state.image} src={this.state.image} />
                <p>{this.state.name} in {this.state.location}</p>
                <Link to={'/details/' + this.state.id}>View Details</Link>
                {this.state.canDelete && <a href="javascript:void(0)" onClick={this.state.del}>Delete</a>}
            </article>
        );
    }
}