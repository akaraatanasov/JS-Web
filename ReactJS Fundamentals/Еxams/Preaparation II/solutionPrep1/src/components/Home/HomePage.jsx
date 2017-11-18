import React, { Component } from 'react';
import FurnitureList from '../common/FurnitureList';
import Paginator from '../common/Paginator';
import { fetchPageAction, fetchSearchAction } from '../../actions/furnitureActions';
import { connect } from 'react-redux';


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.fetchSearch(this.state.query, 1);
    }

    componentWillMount() {
        this.props.fetchPage(1);
    }

    render() {
        let furniture = this.props.furniture;
        const page = this.props.match.params.page || 1;
        if (this.state.query !== '') {
            furniture = furniture.filter(f => f.make.toLowerCase().includes(this.state.query.toLowerCase()) || f.model.toLowerCase().includes(this.state.query.toLowerCase()));
        }
        const pageLength = 2;
        furniture = furniture.slice((page - 1) * pageLength, page * pageLength);

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Welcome to Furniture System</h1>
                        <p>Select furniture from the catalog to view details.</p>

                        <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
                            <input
                                onChange={this.onChange}
                                value={this.state.query}
                                name="query"
                                className="form-control mr-sm-2"
                                placeholder="Search"
                                type="text" />
                            <input className="btn btn-secondary my-2 my-sm-0" type="submit" value="Search" />
                        </form>
                    </div>
                </div>
                <FurnitureList furniture={furniture} />
                <Paginator items={this.props.items} length={pageLength} current={Number(page)}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        furniture: state.furniture,
        items: state.stats.furniture
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPage: (page) => dispatch(fetchPageAction(page)),
        fetchSearch: (query, page) => dispatch(fetchSearchAction(query, page))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);