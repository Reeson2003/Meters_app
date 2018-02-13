import {combineReducers} from 'redux'
import {createStore} from 'redux'
import Flash from './flashReducer'

const store = combineReducers({
    flash: Flash
})

export default createStore(store)