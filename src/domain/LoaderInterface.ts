import {Meters} from './Types'

export const METERS_URL = 'https://izora.info/personal/meters/'
export const METERS_POST_URL = METERS_URL + '?login=yes'
export const LOGOUT_URL = 'https://izora.info/auth/?logout=yes'

export interface Loader {
    getMeters: () => Promise<Meters>
    setMeters: (water: number, gas: number, electricity: { day: number, night: number }) => Promise<boolean>
    logOut: () => Promise<void>
}