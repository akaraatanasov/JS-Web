import React, {Component} from 'react'
import Char from './Char'

class Bio extends Component {
    constructor() { // constructor(props)
        super() // super(props)

        this.state = {
            id: 0, // id: this.props.id
            currChar: {
                url: ''
            }
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/character/' + this.state.id)
            .then(data => {
                return data.json()
            })
            .then(parsedData => {
                this.setState({ currChar: parsedData })
            })
    }

    componentDidUpdate() {
        fetch('http://localhost:9999/character/' + this.props.id)
            .then(data => {
                return data.json()
            })
            .then(parsedData => {
                this.setState({ currChar: parsedData })
            })
    }

    render() {
        return(
            <div>
                <fieldset>
                    <Char params={({url: this.state.currChar.url})} />
                    <p>{this.state.currChar.bio}</p>
                </fieldset>
            </div>
        )
    }
}

export default Bio