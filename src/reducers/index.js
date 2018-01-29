import {combineReducers} from 'redux';
import flashReducer from './flashReducer';
import loginReducer from './loginReducer';
import metersReducer from './metersReducer';

export default combineReducers({
    flash: flashReducer,
    login: loginReducer,
    meters: metersReducer
});