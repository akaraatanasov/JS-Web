import { combineReducers } from 'redux'
import chirps from './chirper'
import auth from './auth'
import calls from './calls'

export default combineReducers({chirps, auth, calls})