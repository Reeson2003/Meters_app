import {DOMParser} from 'react-native-html-parser';

export const Errors = {
    LOGIN_ERROR: 'Incorrect username or password',
    PARSE_ERROR: 'Can not parse data'
};

export default class Parser {
    _username;
    _gasNow;
    _gasPrev;
    _waterNow;
    _waterPrev;
    _eDayNow;
    _eDayPrev;
    _eNightNow;
    _eNightPrev;

    constructor(html) {
        this.parse(html);
    }

    parse = (html) => {
        const parser = new DOMParser({
            errorHandler: {
                warning: () => {
                },
                error: () => {
                },
                fatalError: () => {
                }
            }
        });
        const document = parser.parseFromString(html, "text/html");
        if (this.isNotLoggedIn(document))
            throw Errors.LOGIN_ERROR;
        try {
            this.parseUsername(document);
            this.parseMeters(document);
        } catch (e) {
            throw Errors.PARSE_ERROR;
        }
    };

    isNotLoggedIn = (document) => {
        return document.querySelect('.errortext')[0];
    };

    parseUsername = (document) => {
        const header = document.getElementsByAttribute('id', 'logged-as')[0];
        const em = header.querySelect('em')[0];
        this._username = em.firstChild.data.trim();
    };

    parseMeters = (document) => {
        const table = document.querySelect('table')[1];
        const body = table.querySelect('tbody')[0];
        const row = body.querySelect('tr');
        this.parseWater(row[0]);
        this.parseGas(row[1]);
        this.parseElectricity(row[2]);
    };

    parseWater = (raw) => {
        const td = raw.querySelect('td')[1];
        const data = this.parseData(td);
        this._waterNow = data.current;
        this._waterPrev = data.previous;
    };

    parseGas = (raw) => {
        const td = raw.querySelect('td')[1];
        const data = this.parseData(td);
        this._gasNow = data.current;
        this._gasPrev = data.previous;
    };

    parseElectricity = (raw) => {
        this.parseEDay(raw);
        this.parseENight(raw);
    };

    parseEDay = (raw) => {
        const td = raw.querySelect('td')[1];
        const data = this.parseData(td);
        this._eDayNow = data.current;
        this._eDayPrev = data.previous;
    };

    parseENight = (raw) => {
        const td = raw.querySelect('td')[2];
        const data = this.parseData(td);
        this._eNightNow = data.current;
        this._eNightPrev = data.previous;
    };

    parseData = (raw) => {
        const text = raw.firstChild.data;
        const data = text.trim().split('/');
        return {
            previous: data[0] ? data[0] : 0,
            current: data[1] ? data[1] : 0
        };
    };

    toJson = () => {
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
    };

    get username() {
        return this._username;
    }

    get gasNow() {
        return this._gasNow;
    }

    get gasPrev() {
        return this._gasPrev;
    }

    get waterNow() {
        return this._waterNow;
    }

    get waterPrev() {
        return this._waterPrev;
    }

    get eDayNow() {
        return this._eDayNow;
    }

    get eDayPrev() {
        return this._eDayPrev;
    }

    get eNightNow() {
        return this._eNightNow;
    }

    get eNightPrev() {
        return this._eNightPrev;
    }
}