import { FlashState } from '../store/stateTypes'
import { Actions } from '../actions/flashActions'

const initialStore: FlashState = {
    isOn: false,
    loading: false,
    error: undefined
}

export const flashReducer = (state = initialStore, action: Actions): FlashState => {
    switch (action.type) {
        case 'TOGGLE' : {
            return {
                isOn: state.isOn,
                ...state
            }
        }
        case 'START_LOADING' : {
            return {
                loading: true,
                ...state
            }
        }
        case 'STOP_LOADING' : {
            return {
                loading: false,
                ...state
            }
        }
        case 'ERROR' : {
            return {
                error: action.error,
                ...state
            }
        }
        default : {
            return state
        }
    }
}