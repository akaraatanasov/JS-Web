import React, {Component} from 'react'

import left from '../resources/left.png'
import right from '../resources/right.png'

class Slider extends Component {
    constructor() {
        super()

        this.state = {
            focusedEpId : 0,
            imgUrl: ''
        }

        this.getNewEp = (id) => {
            fetch('http://localhost:9999/episodePreview/' + id)
            .then(data => {
                return data.json()
            })
            .then(parsedData => {
                this.setState({ focusedEpId: parsedData.id })
                this.setState({ imgUrl: parsedData.url })
            })
        }

    }

    componentDidMount() {
        fetch('http://localhost:9999/episodePreview/' + this.state.focusedEpId)
            .then(data => {
                return data.json()
            })
            .then(parsedData => {
                this.setState({ imgUrl: parsedData.url })
            })
    }

    render() {
        return (
            <div>
                <div className='wraper'>
                    <img
                        alt='nope'
                        src={left}
                        className='slider-button case-left'
                        onClick={() => this.getNewEp(Number(this.state.focusedEpId) - 1)}
                    />
                    <img
                        className='sliderImg'
                        alt='focusedEp'
                        src={this.state.imgUrl}
                    />
                    <img
                        alt='nope'
                        src={right}
                        className='slider-button case-right'
                        onClick={() => this.getNewEp(Number(this.state.focusedEpId) + 1)}
                    />
                </div>
            </div>
        )
    }
}

export default Slider