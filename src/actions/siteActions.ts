import {SiteState, State} from '../store/stateTypes'
import {SiteData} from '../domain/Types'

export type LoadRequestAction = {
    type: 'SITE_LOAD_REQUEST'
}

export type LoadSuccessAction = {
    type: 'SITE_LOAD_SUCCESS',
    siteData: SiteData
}

export type LoadErrorAction = {
    type: 'SITE_LOAD_ERROR',
    error: string
}

export type Actions = LoadRequestAction | LoadSuccessAction | LoadErrorAction

type Dispatch = (action: Actions) => void

export type SiteDispatchProps = {
    onLoadRequest: () => void,
    onLoadSuccess: (siteData: SiteData) => void,
    onLoadError: (error: string) => void
}

const loadRequest = (): LoadRequestAction => {
    return {
        type: 'SITE_LOAD_REQUEST'
    }
}

const loadSuccess = (siteData: SiteData): LoadSuccessAction => {
    return {
        type: 'SITE_LOAD_SUCCESS',
        siteData: siteData
    }
}

const loadError = (error: string): LoadErrorAction => {
    return {
        type: 'SITE_LOAD_ERROR',
        error: error
    }
}

export const mapDispatchToProps = (disptch: Dispatch): SiteDispatchProps => {
    return {
        onLoadRequest: () => disptch(loadRequest()),
        onLoadSuccess: siteData => disptch(loadSuccess(siteData)),
        onLoadError: error => disptch(loadError(error))
    }
}

export const mapStateToProps = (state: State): SiteState => state.site