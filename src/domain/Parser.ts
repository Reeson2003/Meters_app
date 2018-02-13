import {DOMParser} from 'react-native-html-parser'
import {Meter, Meters} from './Types'

export const errors = {
    LOGIN_ERROR: 'Incorrect username or password',
    PARSE_ERROR: 'Can not parse data'
}

export interface ParsedData {
    userFullName: string
    sessionId: string
    meters: Meters
}

const parse = (html: string): ParsedData => {
    const parser = new DOMParser({
        errorHandler: {
            /* tslint:disable-next-line */
            warning: () => {
            },
            /* tslint:disable-next-line */
            error: () => {
            },
            /* tslint:disable-next-line */
            fatalError: () => {
            }
        }
    })
    const document = parser.parseFromString(html, 'text/html')
    if (isNotLoggedIn(document))
        throw errors.LOGIN_ERROR
    try {
        return {
            userFullName: parseUsername(document),
            sessionId: parseSessionId(document),
            meters: parseMeters(document)
        }
    } catch (e) {
        throw errors.PARSE_ERROR
    }
}

export default parse

const isNotLoggedIn = (document): boolean => {
    return document.querySelect('.errortext')[0]
}

const parseUsername = (document): string => {
    const header = document.getElementsByAttribute('id', 'logged-as')[0]
    const em = header.querySelect('em')[0]
    return em.firstChild.data.trim()
}

const parseSessionId = (document): string => {
    return document.querySelect('input')[2].attributes[3].value
}

const parseMeters = (document): Meters => {
    const table = document.querySelect('table')[1]
    const body = table.querySelect('tbody')[0]
    const row = body.querySelect('tr')
    const water = parseWater(row[0])
    const gas = parseGas(row[1])
    const electricity = parseElectricity(row[2])
    const editable = water.editable && gas.editable && electricity.day.editable && electricity.night.editable
    return {
        editable: editable,
        water: water.meter,
        gas: gas.meter,
        electricity: {
            day: electricity.day.meter,
            night: electricity.night.meter
        }
    }
}

type EditableMeter = {
    meter: Meter,
    editable: boolean
}

const parseWater = (raw): EditableMeter => {
    const td = raw.querySelect('td')[1]
    return parseData(td)
}

const parseGas = (raw): EditableMeter => {
    const td = raw.querySelect('td')[1]
    return parseData(td)
}

const parseElectricity = (raw): { day: EditableMeter, night: EditableMeter } => {
    parseEDay(raw)
    parseENight(raw)
    return {
        day: parseEDay(raw),
        night: parseENight(raw)
    }
}

const parseEDay = (raw): EditableMeter => {
    const td = raw.querySelect('td')[1]
    return parseData(td)
}

const parseENight = (raw): EditableMeter => {
    const td = raw.querySelect('td')[2]
    return parseData(td)
}

const parseData = (raw): EditableMeter => {
    let editable = false
    const el = raw.firstChild
    const text = el.data
    const data = text.trim().split('/')
    const prev = data[0]
    let curr = data[1]
    if (!curr) {
        curr = raw.querySelect('input')[0].attributes[2].value
        editable = true
    }
    return {
        meter: {
            previous: prev,
            current: curr
        },
        editable: editable
    }
}