import {FlashState} from '../store/stateTypes'
import {Actions} from '../actions/flashActions'

const initialStore: FlashState = {
    isOn: false,
    loading: false,
    error: undefined
}

const flashReducer = (state = initialStore, action: Actions): FlashState => {
    switch (action.type) {
        case 'TOGGLE' : {
            return {
                ...state,
                isOn: !state.isOn
            }
        }
        case 'START_LOADING' : {
            return {
                ...state,
                loading: true
            }
        }
        case 'STOP_LOADING' : {
            return {
                ...state,
                loading: false
            }
        }
        case 'ERROR' : {
            return {
                ...state,
                error: action.error
            }
        }
        default : {
            return state
        }
    }
}

export default flashReducer