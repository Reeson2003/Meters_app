export type Meter = {
    current: number,
    previous: number
}

export type Meters = {
    editable: boolean,
    water: Meter,
    gas: Meter,
    electricity: {
        day: Meter,
        night: Meter
    }
}

export type User = {
    username: string,
    password: string,
    fullName: string
}