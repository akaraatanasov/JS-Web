import React, { Component } from 'react';
import Input from '../common/Input';
import { createHotel } from '../../api/remote';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            description: '',
            numberOfRooms: 0,
            image: '',
            parkingSlots: 0
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        createHotel(this.state.name, this.state.location, this.state.description, this.state.numberOfRooms, this.state.image, this.state.parkingSlots)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container">
                <h1>Add hotel</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="location"
                        value={this.state.location}
                        onChange={this.onChangeHandler}
                        label="Location"
                    />
                    <Input
                        name="description"
                        type="textbox"
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                        label="Description"
                    />
                    <Input
                        name="numberOfRooms"
                        type="number"
                        value={this.state.numberOfRooms}
                        onChange={this.onChangeHandler}
                        label="Number of rooms"
                    />
                    <Input
                        name="image"
                        value={this.state.image}
                        onChange={this.onChangeHandler}
                        label="Image"
                    />
                    <Input
                        name="parkingSlots"
                        type="number"
                        value={this.state.parkingSlots}
                        onChange={this.onChangeHandler}
                        label="Parking slots"
                    />
                    <input type="submit" className="btn btn-primary" value="Add" />
                </form>
            </div>
        );
    }
}