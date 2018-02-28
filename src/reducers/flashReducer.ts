import {FlashState} from '../store/stateTypes'
import {Actions} from '../actions/flashActions'

const initialStore: FlashState = {
    isOn: false,
    loading: false,
    error: undefined
}

const flashReducer = (state = initialStore, action: Actions): FlashState => {
    switch (action.type) {
        case 'TOGGLE_SUCCESS' : {
            return {
                ...state,
                loading: false,
                isOn: !state.isOn,
                error: undefined
            }
        }
        case 'TOGGLE_REQUEST' : {
            return {
                ...state,
                loading: true
            }
        }
        case 'TOGGLE_ERROR' : {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        default : {
            return state
        }
    }
}

export default flashReducer