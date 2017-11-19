import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class FurnitureList extends Component {
    render() {
        const { id, image, make, model, price } = this.props;
        return (
            <div className="col-md-4">
                <div className="card text-white bg-primary">
                    <div className="card-body">
                        <blockquote className="card-blockquote">
                            <img src={image} />
                            <p>{model} by {make}</p>
                            <footer>
                                <cite title="Source Title">{price} lv.</cite>
                            </footer>
                            <div className="pull-right">
                                <Link to={'/details/' + id} className="btn btn-info">Details</Link>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        );
    }
}