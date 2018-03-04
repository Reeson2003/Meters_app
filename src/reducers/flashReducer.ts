import {FlashState, initialFlashState} from '../store/stateTypes'
import {Actions} from '../actions/flashActions'

const flashReducer = (state = initialFlashState, action: Actions): FlashState => {
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