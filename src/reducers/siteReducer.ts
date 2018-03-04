import {SiteState, initialSiteState} from '../store/stateTypes'
import {Actions} from '../actions/siteActions'

const siteReducer = (state = initialSiteState, action: Actions): SiteState => {
    switch (action.type) {
        case 'SITE_LOAD_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'SITE_LOAD_SUCCESS':
            return {
                ...state,
                site: action.siteData,
                loading: false
            }
        case 'SITE_LOAD_ERROR':
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}

export default siteReducer