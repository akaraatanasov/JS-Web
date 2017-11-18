import React, { Component } from 'react';
import { getDetail, getReviews } from '../../api/remote';

import AddReview from './AddReview'
import ListReview from './ListReview'

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            description: '',
            numberOfRooms: 0,
            image: '',
            parkingSlots: 0,
            reviews: []
        };

        this.getDetails = this.getDetails.bind(this);
        this.getRatings = this.getRatings.bind(this);
    }

    componentDidMount() {
        const hotelId = Number(this.props.match.params.id);

        this.getDetails(hotelId)
            .then((res) => {
                return res
            }).then(res => {
                this.getRatings(hotelId)
                .then((ratings) => {
                    let data = res
                    data.reviews = ratings;
                    this.setState(data);
                    return data
                })
            }).then(data => {
                

                console.log(data);
            })
    }


    async getDetails(hotelId) {
        return await getDetail(hotelId);
    }

    async getRatings(hotelId) {
        return await getReviews(hotelId);
    }

    render() {
        const hotelId = Number(this.props.match.params.id)

        return (
            <div>
                <h1>{this.state.name}</h1>
                <div>{this.state.location}</div>
                <div>{this.state.description}</div>
                <div>{this.state.numberOfRooms}</div>
                <img src={this.state.image}/>
                <div>{this.state.parkingSlots}</div>
                <br></br>
                <AddReview id={hotelId}/>
                {/* {this.state.reviews.map((review) => 
                   <ListReview
                        rating={review.rating}
                        comment={review.comment}
                        user={review.user}
                    />
                )} */}
            </div>
        );
    }
}