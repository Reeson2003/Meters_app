export type FlashState = {
    isOn: boolean,
    loading: boolean,
    error: string
}

export type UserState = {
    username: string,
    password: string,
    fullName: string,
    loading: boolean,
    error: string
}

export type Meter = {
    current: number,
    previous: number
}

export type MetersState = {
    water: Meter,
    gas: Meter,
    electricity: {
        day: Meter,
        night: Meter
    },
    loading: boolean,
    error: string
}

export type State = {
    flash: FlashState,
    user: UserState,
    meters: MetersState
}