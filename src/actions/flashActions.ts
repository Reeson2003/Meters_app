import {FlashState, State} from '../store/stateTypes'

export type ToggleAction = {
    type: 'TOGGLE'
}

export type StartLoadingAction = {
    type: 'START_LOADING'
}

export type StopLoadingAction = {
    type: 'STOP_LOADING'
}

export type ErrorAction = {
    type: 'ERROR',
    error: string
}

export type Actions = ToggleAction | StartLoadingAction | StopLoadingAction | ErrorAction

type Dispatch = (action: Actions) => void

export interface DispatchProps {
    onToggle: () => void,
    onStartLoading: () => void,
    onStopLoading: () => void,
    onError: (error: string) => void
}

const toggle = (): Actions => {
    return {
        type: 'TOGGLE'
    }
}

const startLoading = (): Actions => {
    return {
        type: 'START_LOADING'
    }
}

const stopLoading = (): Actions => {
    return {
        type: 'STOP_LOADING'
    }
}

const error = (err: string): Actions => {
    return {
        type: 'ERROR',
        error: err
    }
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onToggle: () => {dispatch(toggle())},
        onStartLoading: () => {dispatch(startLoading())},
        onStopLoading: () => {dispatch(stopLoading())},
        onError: (err: string) => {dispatch(error(err))}
    }
}

export const mapStateToProps = (state: State): FlashState => {
    return state.flash
}