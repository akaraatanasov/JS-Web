import React, { Component } from 'react';
import Input from '../Auth/Input';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createAction } from '../../actions/furnitureActions';


class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            make: '',
            model: '',
            year: '',
            description: '',
            price: '',
            image: '',
            material: '',
            submitting: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({submitting: true});
        const furniture = {
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            description: this.state.description,
            price: this.state.price,
            image: this.state.image,
            material: this.state.material
        };
        await this.props.create(furniture);
        this.setState({submitting: false});
        this.props.history.push('/profile');
    }

    render() {
        const { make,
            model,
            year,
            description,
            price,
            image,
            material } = this.state;

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Create New Furniture</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <Input
                                onChange={this.onChange}
                                label="Make"
                                name="make"
                                value={make} />
                            <Input
                                onChange={this.onChange}
                                label="Model"
                                name="model"
                                value={model} />
                            <Input
                                onChange={this.onChange}
                                label="Year"
                                name="year"
                                type="number"
                                value={year} />
                            <Input
                                onChange={this.onChange}
                                label="Description"
                                name="description"
                                value={description} />
                        </div>
                        <div className="col-md-4">
                            <Input
                                onChange={this.onChange}
                                label="Price"
                                name="price"
                                type="number"
                                value={price} />
                            <Input
                                onChange={this.onChange}
                                label="Image"
                                name="image"
                                value={image} />
                            <Input
                                onChange={this.onChange}
                                label="Material"
                                name="material"
                                value={material} />
                            <input type="submit" className="btn btn-primary" value="Create" disabled={this.state.submitting}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    return ({

    });
}

function mapDispatch(dispatch) {
    return {
        create: (data) => dispatch(createAction(data))
    };
}

export default connect(mapState, mapDispatch)(withRouter(CreatePage));