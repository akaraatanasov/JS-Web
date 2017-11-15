import React from 'react'
import { connect } from 'react-redux'

import Chirp from './Chirp'

let Home = (props) => {
    return (
        <section id="viewFeed">
        <div className="content">
          <div className="chirper">
            <h2 className="titlebar">Pesho</h2>
            <form id="formSubmitChirp" className="chirp-form">
              <textarea name="text" className="chirp-input" defaultValue={""} />
              <input className="chirp-submit" id="btnSubmitChirp" defaultValue="Chirp" type="submit" />
            </form>
            <div id="userStats" className="user-details">
              <span>0 chirps</span> | <span>1 following</span> | <span>0 followers</span>
            </div>
          </div>
          <div id="chirps" className="chirps">
            <h2 className="titlebar">Chirps</h2>
            {/* {console.log(props.store.auth.subscriptions)}
            {props.store.chirps
                .filter(elem => {
                    if (props.store.auth.subscriptions.indexOf(elem.author) >= 0) {
                        return elem
                    }
                })
                .map(el => {
                    return <Chirp key={el._id} props={el}/>
                })
            } */}
          </div>
        </div>
      </section>      
    )
}

function mapStateToProps(state) {
    return {
        store: state
    };
}

export default connect(mapStateToProps, null)(Home)