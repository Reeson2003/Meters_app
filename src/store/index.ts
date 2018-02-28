import {combineReducers} from 'redux'
import {createStore} from 'redux'
import Flash from '../reducers/flashReducer'

const store = combineReducers({
    flash: Flash
})

export default createStore(store)