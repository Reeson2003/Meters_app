export type FlashStore = {
    isOn: boolean,
    loading: boolean,
    error: string
}

export type UserStore = {
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

export type MetersStore = {
    water: Meter,
    gas: Meter,
    electricity: {
        day: Meter,
        night: Meter
    },
    loading: boolean,
    error: string
}