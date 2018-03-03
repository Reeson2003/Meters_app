import {DOMParser} from 'react-native-html-parser'
import {Meter, Meters} from './Types'

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
    const parser = getParser()
    const document = parser.parseFromString(html, 'text/html')
    const raw = parseRaw(document)
    return convertRaw(raw)
}

const getParser = () => {
    return new DOMParser({
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
}

const convertRaw = (raw: ParsingResult): ParsedData => {
    return {
        userFullName: raw.loggedAs,
        sessionId: raw.sessionId,
        meters: convertMeters(raw)
    }
}

const convertMeters = (raw: ParsingResult): Meters => {
    if (raw.water === undefined || raw.gas === undefined || raw.electricityDay === undefined || raw.electricityNight === undefined)
        return undefined
    const isEditable: boolean = raw.waterInput !== undefined &&
        raw.gasInput !== undefined &&
        raw.electricityDayInput !== undefined &&
        raw.electricityNightInput !== undefined
    return {
        editable: isEditable,
        water:
            convertMeter(raw.water, raw.waterInput),
        gas:
            convertMeter(raw.gas, raw.gasInput),
        electricity:
            {
                day: convertMeter(raw.electricityDay, raw.electricityDayInput),
                night:
                    convertMeter(raw.electricityNight, raw.electricityNightInput)
            }
    }
}

const convertMeter = (meterString: string, meterInputString: string): Meter => {
    if (meterString === undefined)
        return undefined
    const metersBoth = meterString.split('/').map(m => m.trim())
    if (!meterInputString)
        return {
            previous: Number.parseInt(metersBoth[0]),
            current: Number.parseInt(metersBoth[1])
        }
    else
        return {
            previous: Number.parseInt(metersBoth[0]),
            current: Number.parseInt(meterInputString)
        }
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
            const el = element.attributes[2].value
            if (el === SESSION_ID_SELECTOR.replace('#', ''))
                return element.attributes[3].value
            return el
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