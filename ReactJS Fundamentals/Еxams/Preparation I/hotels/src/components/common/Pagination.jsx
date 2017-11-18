import React, { Component } from 'react'

export default class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state={
            pageNumber: props.pageNumber,
            paginate: props.paginate,
            value: props.value
        }
    }

    render() {
        return (
                <button onClick={this.state.paginate}>{this.state.value}</button>
        )
    }
}