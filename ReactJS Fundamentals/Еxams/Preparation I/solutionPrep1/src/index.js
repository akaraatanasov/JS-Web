import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './style/bootstrap.min.css';
import './style/site.css';
import { BrowserRouter as Router } from 'react-router-dom';
import reducers from './reducers/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
