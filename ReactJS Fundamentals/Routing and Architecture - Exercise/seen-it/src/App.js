import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'

import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './components/auth/Home'
import Wrapper from './components/common/LoggedWrapper'
import './App.css';

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      token: '',
      username: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ token: localStorage.getItem('token') })
    }

    if (localStorage.getItem('username')) {
      this.setState({ username: localStorage.getItem('username') })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          { this.state.token === '' ? <Home /> : <Wrapper /> }

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
