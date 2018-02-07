import {Meters, User} from '../domain/Types'

export type FlashState = {
    isOn: boolean,
    loading: boolean,
    error: string
}

export type UserState = {
    user: User,
    loading: boolean,
    error: string
}

export type MetersState = {
    meters: Meters,
    loading: boolean,
    error: string
}

export type State = {
    flash: FlashState,
    user: UserState,
    meters: MetersState
}