import {SiteData} from '../domain/Types'

export type FlashState = {
    isOn: boolean,
    loading: boolean,
    error: string
}

export const initialFlashState: FlashState = {
    isOn: false,
    loading: false,
    error: undefined
}

export type SiteState = {
    site: SiteData,
    loading: boolean,
    error: string
}

export const initialSiteState: SiteState = {
    site: {
        session: undefined,
        userFullName: undefined,
        meters: undefined
    },
    loading: false,
    error: undefined
}

export type State = {
    flash: FlashState,
    site: SiteState
}