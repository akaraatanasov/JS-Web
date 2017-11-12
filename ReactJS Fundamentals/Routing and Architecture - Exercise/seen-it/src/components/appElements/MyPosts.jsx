import React, { Component } from 'react'
import Post from './partials/Post'
import reqHandler from './../../utils/reqHandler'

class MyPosts extends Component {
    constructor() {
        super()

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        reqHandler.pullMyPosts()
            .then(data => {
                this.setState({ posts: data })
            })
    }

    render() {
        return (
            <section id="viewMyPosts">
                <div class="post post-content">
                    <h1>Your Posts</h1>
                </div>
                <div class="posts">
                        {this.state.posts.map(post => {
                            return <Post key={post._id} props={post}/>
                        })}
                    </div>
            </section>
        )
    }
}

export default MyPosts