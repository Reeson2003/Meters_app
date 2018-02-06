import {FlashState, State} from '../store/stateTypes'

export type TogglehAction = {
    type: 'TOGGLE',
};

export type StartLoadingAction = {
    type: 'START_LOADING'
};

export type StopLoadingAction = {
    type: 'STOP_LOADING'
};

export type ErrorAction = {
    type: 'ERROR',
    error: string
};

export type Actions = TogglehAction | StartLoadingAction | StopLoadingAction | ErrorAction;

const mapStateToProps = (state: State): FlashState => {
    return state.flash
}

type Dispatch = (action: Actions) => void;

interface DispatchFromProps {
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
    };
}

const stopLoading = ():Actions => {
    return {
        type: 'STOP_LOADING'
    };
}

const error = (error: string): Actions => {
    return {
        type: 'ERROR',
        error: error
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => {
    return {
        onToggle: () => dispatch(toggle()),
        onStartLoading: () => dispatch(startLoading()),
        onStopLoading: () => dispatch(stopLoading()),
        onError: (err: string) => dispatch(error(err))
    }
}