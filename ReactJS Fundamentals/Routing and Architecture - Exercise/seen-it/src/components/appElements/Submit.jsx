import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'
import dataCollector from './../../utils/dataCollector'
import reqHandler from './../../utils/reqHandler'

class Submit extends Component {
    constructor() {
        super()

        this.state = {
            fireRedirect: false
        }

        this.dataCollector = (e) => {
            this.setState(dataCollector(e))
        }

        this.createPost = (e) => {
            e.preventDefault()

            reqHandler.createPost(this.state)
                .then(data => {
                    console.log(data)
                    this.setState({ fireRedirect: true })
                })
        }
    }

    componentDidMount() {
        this.setState({author: localStorage.getItem('username')})
    }

    render() {
        const { fireRedirect } = this.state

        return (
            <div class="submitArea formContainer">
                <form id="editPostForm" class="submitForm" onSubmit={(e) => {this.createPost(e)}}>
                    <label>Link URL:</label>
                    <input onChange={(e) => {this.dataCollector(e)}} name="url" type="text"/>
                    <label>Link Title:</label>
                    <input onChange={(e) => {this.dataCollector(e)}} name="title" type="text"/>
                    <label>Link Thumbnail Image (optional):</label>
                    <input onChange={(e) => {this.dataCollector(e)}} name="imageUrl" type="text" />
                    <label>Comment (optional):</label>
                    <textarea onChange={(e) => {this.dataCollector(e)}} name="description"></textarea>
                    <input id="btnEditPost" type="submit" value="Edit Post" />
                </form>
                {fireRedirect && (<Redirect to='/'/>)}
            </div>
        )
    }
}

export default Submit