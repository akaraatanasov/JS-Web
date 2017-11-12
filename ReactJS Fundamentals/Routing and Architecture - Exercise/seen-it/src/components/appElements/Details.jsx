import React, { Component } from 'react'
import Comment from './partials/Comment'
import reqHandler from './../../utils/reqHandler'
import dateConverter from './../../utils/dateConverter'

class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: {},
            comments: [],
            time: ''
        }
    }

    loadComments = (postId) => {
        reqHandler.loadCommentsById(postId)
            .then(comments => {
                this.setState({ comments: comments })
            })
    }

    componentDidMount() {
        let postId = this.props.match.params.postId;
        console.log(postId)
        reqHandler.loadPostById(postId)
            .then(post => {
                console.log(post)
                let time = dateConverter(post._kmd.etc);
                this.setState({ post, time: time})
            }).then(() => {
                this.loadComments(postId)
            })
    }


    render() {
        return (
            <section id="viewComments">
                <div class="post">
                    <div class="col thumbnail">
                        <a href={this.state.post.url}>
                            <img src={this.state.post.imageUrl}/>
                        </a>
                    </div>
                    <div class="post-content">
                        <div class="title">
                            <a href={this.state.post.url}>
                                {this.state.post.title}
                            </a>
                        </div>
                        <div class="details">
                            <p>{this.state.post.description}</p>
                            <div class="info">
                                submitted {this.state.time} ago by {this.state.post.author}
                            </div>
                            <div class="controls">
                                <ul>
                                    <li class="action"><a class="editLink" href="#">edit</a></li>
                                    <li class="action"><a class="deleteLink" href="#">delete</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div class="clear"></div>
                    {/* {CreateComment} */}
                    {this.state.comments.map((c, i) => {
                        return <Comment key={i} data={c} />
                    })}
                </div>
                
            </section>
        )
    }
}

export default Details