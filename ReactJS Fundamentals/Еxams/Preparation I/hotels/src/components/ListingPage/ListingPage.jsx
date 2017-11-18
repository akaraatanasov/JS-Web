import React, { Component } from 'react';
import { getPage, deleteHotel } from '../../api/remote';
import HotelCard from './HotelCard'
import Pagination from './../common/Pagination'

export default class ListingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: [],
            allPages: 0
        };

        this.page = Number(this.props.match.params.id) || 1;
        this.paginateNext = this.paginateNext.bind(this);
        this.paginatePrev = this.paginatePrev.bind(this);

        this.getData = this.getData.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
    }

    componentDidMount() {
        this.getData(this.page)
            .then(() => console.log(this.state.hotels))
    }

    async getData(page) {
        const data = await getPage(page);
        const allHotels = Math.ceil(data[0].id/10)

        this.setState({ hotels: data });
        this.setState({ allPages: allHotels });
    }

    async deleteHotel(id) {
        try {
            const res = await deleteHotel(id);
            console.log(res);
        } catch (e) {
            
        }
        this.setState({ hotels: this.state.hotels.filter(h => h.id !== id) });
        this.getData();
    }

    paginateNext() {
        if (this.page > 0 && this.page < this.state.allPages ) {
            this.page++;
            this.getData(this.page);
        }
    }

    paginatePrev() {
        if (this.page > 1) {
            this.page--;
            this.getData(this.page);
        }
    }

    render() {
        return (
            <div className="container">
                {this.state.hotels.map((hotelInfo) => 
                   <HotelCard
                        canDelete={hotelInfo.id === 2}
                        del={() => this.props.deleteHotel(hotelInfo.id)}
                        key={hotelInfo.id}
                        id={hotelInfo.id}
                        name={hotelInfo.name}
                        location={hotelInfo.location}
                        image={hotelInfo.image} 
                    />
                )}
                <div>
                    <Pagination pageNumber={this.page} paginate={this.paginatePrev} value="< Prev "/>
                    <Pagination pageNumber={this.page} paginate={this.paginateNext} value=" Next >"/>
                </div>
            </div>
        );
    }
}