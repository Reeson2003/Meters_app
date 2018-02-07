import {DOMParser} from 'react-native-html-parser'
import {Meters} from './Types'

export const errors = {
    LOGIN_ERROR: 'Incorrect username or password',
    PARSE_ERROR: 'Can not parse data'
}

export default class Parser {
    userFullName: string
    info: string
    sessionId: string
    meters: Meters

    constructor(html) {
        this.parse(html)
    }

    public toJson = () => {
        return {
            username: this._username,
            meters: {
                water: {
                    previous: this._waterPrev,
                    current: this._waterNow
                },
                gas: {
                    previous: this._gasPrev,
                    current: this._gasNow
                },
                electricity: {
                    day: {
                        previous: this._eDayPrev,
                        current: this._eDayNow
                    },
                    night: {
                        previous: this._eNightPrev,
                        current: this._eNightNow
                    }
                }
            }
        }
    }

    private parse = (html) => {
        const parser = new DOMParser({
            errorHandler: {
                /* tslint:disable-next-line */
                warning: () => {},
                /* tslint:disable-next-line */
                error: () => {},
                /* tslint:disable-next-line */
                fatalError: () => {}
            }
        })
        const document = parser.parseFromString(html, 'text/html')
        if (this.isNotLoggedIn(document))
            throw errors.LOGIN_ERROR
        try {
            this.parseUsername(document)
            this.parseSessionId(document)
            this.parseMeters(document)
        } catch (e) {
            throw errors.PARSE_ERROR
        }
    }

    private isNotLoggedIn = (document) => {
        return document.querySelect('.errortext')[0]
    }

    private parseUsername = (document) => {
        const header = document.getElementsByAttribute('id', 'logged-as')[0]
        const em = header.querySelect('em')[0]
        this.userFullName = em.firstChild.data.trim()
    }

    private parseSessionId = (document) => {

    }

    private parseMeters = (document) => {
        const table = document.querySelect('table')[1]
        const body = table.querySelect('tbody')[0]
        const row = body.querySelect('tr')
        this.parseWater(row[0])
        this.parseGas(row[1])
        this.parseElectricity(row[2])
    }

    private parseWater = (raw) => {
        const td = raw.querySelect('td')[1]
        const data = this.parseData(td)
        this._waterNow = data.current
        this._waterPrev = data.previous
    }

    private parseGas = (raw) => {
        const td = raw.querySelect('td')[1]
        const data = this.parseData(td)
        this._gasNow = data.current
        this._gasPrev = data.previous
    }

    private parseElectricity = (raw) => {
        this.parseEDay(raw)
        this.parseENight(raw)
    }

    private parseEDay = (raw) => {
        const td = raw.querySelect('td')[1]
        const data = this.parseData(td)
        this._eDayNow = data.current
        this._eDayPrev = data.previous
    }

    private parseENight = (raw) => {
        const td = raw.querySelect('td')[2]
        const data = this.parseData(td)
        this._eNightNow = data.current
        this._eNightPrev = data.previous
    }

    private parseData = (raw) => {
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
}