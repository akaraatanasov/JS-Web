import React, {Component} from 'react'
import Login from './Login'
import Register from './Register'

class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <section id="viewWelcome">
                <div class="welcome">
                    <div class="signup">
                        <Login />
                        <Register />
                    </div>

                    <div class="about">
                        <h1>Welcome to SeenIt</h1>
                        <p>
                            Share interesting links and discuss great content. It's what's happening now.
                        </p>
                        <p>Sign in or sign up in a second.</p>
                    </div>
                </div>
            </section>
        )
    }
}

export default Home