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

const LOGGED_AS_SELECTOR = '#logged-as > em'
const WARN_SELECTOR = '#middle > div'
const SESSION_ID_SELECTOR = '#sessid'
const WATER_SELECTOR = '#middle > div > table > tbody > tr:nth-child(1) > td:nth-child(2)'
const WATER_INPUT_SELECTOR = '#middle > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type="text"]'
const GAS_SELECTOR = '#middle > div > table > tbody > tr:nth-child(2) > td:nth-child(2)'
const GAS_INPUT_SELECTOR = '#middle > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type="text"]'
const ELECTRICITY_DAY_SELECTOR = '#middle > div > table > tbody > tr:nth-child(3) > td:nth-child(2)'
const ELECTRICITY_DAY_INPUT_SELECTOR = '#middle > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type="text"]'
const ELECTRICITY_NIGHT_SELECTOR = '#middle > div > table > tbody > tr:nth-child(3) > td:nth-child(3)'
const ELECTRICITY_NIGHT_INPUT_SELECTOR = '#middle > div > table > tbody > tr:nth-child(3) > td:nth-child(3) > input[type="text"]'

type ParsingResult = {
    loggedAs: string,
    warning: string,
    sessionId: string,
    water: string,
    waterInput: string,
    gas: string,
    gasInput: string,
    electricityDay: string,
    electricityDayInput: string,
    electricityNight: string,
    electricityNightInput: string
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
    const raw = parseRaw(document)
    console.log(raw)
    return undefined
}

const parseRaw = (doc): ParsingResult => {
    const loggedAs = querySelector(doc, LOGGED_AS_SELECTOR)
    const warning = querySelector(doc, WARN_SELECTOR)
    const sessionId = querySelector(doc, SESSION_ID_SELECTOR)
    const water = querySelector(doc, WATER_SELECTOR)
    const waterInput = querySelector(doc, WATER_INPUT_SELECTOR)
    const gas = querySelector(doc, GAS_SELECTOR)
    const gasInput = querySelector(doc, GAS_INPUT_SELECTOR)
    const electricityDay = querySelector(doc, ELECTRICITY_DAY_SELECTOR)
    const electricityDayInput = querySelector(doc, ELECTRICITY_DAY_INPUT_SELECTOR)
    const electricityNight = querySelector(doc, ELECTRICITY_NIGHT_SELECTOR)
    const electricityNightInput = querySelector(doc, ELECTRICITY_NIGHT_INPUT_SELECTOR)
    return {
        loggedAs: loggedAs,
        warning: warning,
        sessionId: sessionId,
        water: water,
        waterInput: waterInput,
        gas: gas,
        gasInput: gasInput,
        electricityDay: electricityDay,
        electricityDayInput: electricityDayInput,
        electricityNight: electricityNight,
        electricityNightInput: electricityNightInput
    }
}

const querySelector = (document, selector: string) => {
    try {
        const queryArray = selector.trim().split('>').map(el => el.trim())
        let element = document
        for (let obj of queryArray) {
            if (obj.charAt(0) === '#')
                element = element.getElementsByAttribute('id', obj.replace('#', ''))[0]
            else if (obj.includes(':'))
                element = selectChild(element, obj)
            else if (obj.includes('[') && obj.includes(']'))
                element = selectSpec(element, obj)
            else
                element = element.querySelect(obj)[0]
        }
        try {
            return element.firstChild.data.trim()
        } catch (e) {
            return element.attributes[2].value
        }
    } catch (e) {
        return undefined
    }
}

const selectSpec = (element, query: string) => {
    const tag = query.slice(0, query.indexOf('['))
    const elem = element.querySelect(tag)[0]
    return elem
}

const selectChild = (element, query: string) => {
    const attributes = parseChildQuery(query)
    return element.querySelect(attributes.tag)[attributes.n - 1]
}

const parseChildQuery = (query: string): { tag: string, n: number } => {
    const tag = query.slice(0, query.indexOf(':'))
    const n = Number.parseInt(query.slice(query.indexOf('(') + 1, query.lastIndexOf(')')))
    return {
        tag: tag,
        n: n
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