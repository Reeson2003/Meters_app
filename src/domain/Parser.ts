import {DOMParser} from 'react-native-html-parser'
import {Meter, Meters} from './Types'

export const errors = {
    LOGIN_ERROR: 'Incorrect username or password',
    PARSE_ERROR: 'Can not parse data'
}

interface ParsedData {
    userFullName: string
    info: string
    sessionId: string
    meters: Meters
}

let userFullName: string
let info: string
let sessionId: string
let meters: Meters

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
        parseUsername(document)
        parseSessionId(document)
        parseMeters(document)
        return {
            userFullName: userFullName,
            info: info,
            sessionId: sessionId,
            meters: meters
        }
    } catch (e) {
        throw errors.PARSE_ERROR
    }
}

export default parse

const isNotLoggedIn = (document): boolean => {
    return document.querySelect('.errortext')[0]
}

const parseUsername = (document): void => {
    const header = document.getElementsByAttribute('id', 'logged-as')[0]
    const em = header.querySelect('em')[0]
    userFullName = em.firstChild.data.trim()
}

const parseSessionId = (document) => {
    sessionId = document.querySelect('input')[2].attributes[3].value
}

const parseMeters = (document) => {
    const table = document.querySelect('table')[1]
    const body = table.querySelect('tbody')[0]
    const row = body.querySelect('tr')
    parseWater(row[0])
    parseGas(row[1])
    parseElectricity(row[2])
}

const parseWater = (raw) => {
    const td = raw.querySelect('td')[1]
    meters.water = parseData(td)
}

const parseGas = (raw) => {
    const td = raw.querySelect('td')[1]
    meters.gas = parseData(td)
}

const parseElectricity = (raw) => {
    parseEDay(raw)
    parseENight(raw)
}

const parseEDay = (raw) => {
    const td = raw.querySelect('td')[1]
    meters.electricity.day = parseData(td)
}

const parseENight = (raw) => {
    const td = raw.querySelect('td')[2]
    meters.electricity.night = parseData(td)
}

const parseData = (raw): Meter => {
    const el = raw.firstChild
    const text = el.data
    const data = text.trim().split('/')
    const prev = data[0]
    let curr = data[1]
    if (!curr)
        curr = raw.querySelect('input')[0].attributes[2].value
    return {
        previous: prev,
        current: curr
    }
}