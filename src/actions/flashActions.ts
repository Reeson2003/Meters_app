import {FlashState, State} from '../store/stateTypes'

export type ToggleSuccessAction = {
    type: 'TOGGLE_SUCCESS'
}

export type ToggleRequestAction = {
    type: 'TOGGLE_REQUEST'
}

export type ToggleErrorAction = {
    type: 'TOGGLE_ERROR',
    error: string
}

export type Actions = ToggleSuccessAction | ToggleRequestAction | ToggleErrorAction

type Dispatch = (action: Actions) => void

export type FlashDispatchProps = {
    onToggleRequest: () => void,
    onToggleSuccess: () => void,
    onToggleError: (error: string) => void
}

const toggleSuccess = (): Actions => {
    return {
        type: 'TOGGLE_SUCCESS'
    }
}

const toggleRequest = (): Actions => {
    return {
        type: 'TOGGLE_REQUEST'
    }
}

const toggleError = (err: string): Actions => {
    return {
        type: 'TOGGLE_ERROR',
        error: err
    }
}

export const mapDispatchToProps = (dispatch: Dispatch): FlashDispatchProps => {
    return {
        onToggleRequest: () => {dispatch(toggleRequest())},
        onToggleSuccess: () => {dispatch(toggleSuccess())},
        onToggleError: error => {dispatch(toggleError(error))}
    }
}

export const mapStateToProps = (state: State): FlashState => state.flash