import React, { Component } from 'react';
import './App.css';
import dataSource from './services/dataSource';
import CommentsList from './components/CommentsList';
import withSubscription from './services/withSubscription';

const PostList = (props) => (
    <div>
        <h2>Posts</h2>
        <div>
            {props.posts &&
                props.posts.map((p, i) => (
                    <article key={i}>
                        <span>{p.author}</span>
                        <p>{p.text}</p>
                    </article>))}
        </div>
    </div>
);

dataSource.setData('comments', [
    'some comment',
    'another comments',
    'angry comments'
]);

dataSource.setData('posts', [
    { author: 'pesho', text: 'wazaaa' },
    { author: 'gosho', text: 'not much' }
]);

const SubscribedList = withSubscription(CommentsList, 'comments');
const SubscribedPosts = withSubscription(PostList, 'posts');

class App extends Component {
    constructor(props) {
        super(props);
    }

    changeData() {
        dataSource.setData('comments', [
            'some comment',
            'another comments',
            'angry comments',
            'haters gonna hate'
        ]);
        dataSource.setData('posts', [
            { author: 'pesho', text: 'wazaaa' },
            { author: 'gosho', text: 'not much' },
            { author: 'maria', text: 'im a gurl gamer' },
        ]);
    }

    render() {
        return (
            <div className="App">
                <SubscribedList />
                <button onClick={this.changeData}>Change  data</button>
                <SubscribedPosts />
            </div>
        );
    }
}

export default App;
