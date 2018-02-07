import {createStore} from 'redux'

import {initialStore as flash} from './flashStore';
import {initialStore as login} from "./loginStore";
import {initialStore as meters} from "./metersStore";
import Reducer from "../reducers";

const initialStore = {
    flash:flash,
    login:login,
    meters:meters
};

export default createStore(Reducer, initialStore);