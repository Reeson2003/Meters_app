//// uncomment to test on node.js
// import FormData from 'form-data'
// import fetch, {Response} from 'node-fetch'
import {Meters} from './Types'
import parse, {ParsedData} from './Parser'
import {Loader, LOGOUT_URL, METERS_POST_URL, METERS_URL} from './LoaderInterface'

export const getLoader = (username: string, password: string): Promise<Loader> => {
    return new LoaderImpl().getInstance(username, password)
}

export default getLoader

class LoaderImpl implements Loader {
    private cookies: Map<string, string> = new Map<string, string>()
    private data: ParsedData = undefined
    public getInstance = (username: string, password: string): Promise<Loader> => {
        return new Promise((resolve, reject) => {
            this.initSession(username, password)
                .then(() => resolve(this))
                .catch(error => reject(error))
        })
    }
    public getMeters = (): Promise<Meters> => {
        return fetch(METERS_URL, {
            headers: this.getHeaders()
        })
            .then(response => response.text())
            .then(html => parse(html).meters)
    }
    public setMeters = (water: number, gas: number, electricity: { day: number, night: number }): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            if (!this.data)
                reject('Data is undefined')
            else if (!this.data.meters.editable)
                reject('Edition disabled')
            else {
                const form = this.getMetersForm(water, gas, electricity, this.data.sessionId)
                fetch(METERS_URL, {
                    method: 'post',
                    headers: this.getHeaders(),
                    body: form
                })
                    .then(() => resolve(true))
                    .catch(error => reject(error))
            }
        })
    }
    public logOut = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            fetch(LOGOUT_URL)
                .then((_response: Response) => {
                    this.cookies = undefined
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }
    private logIn = (username: string, password: string): Promise<void> => {
        const form = this.getLoginForm(username, password)
        return fetch(METERS_POST_URL, {
            method: 'post',
            headers: this.getHeaders(),
            body: form
        })
            .then(response => {
                this.saveCookies(this.getCookieString(response))
                return response.text()
            })
            .then(html => {
                this.data = parse(html)
            })
    }
    private initSession = (username: string, password: string): Promise<void> => {
        return fetch(METERS_URL)
            .then((response: Response) => {
                this.saveCookies(this.getCookieString(response))
            })
            .then(() => this.logIn(username, password))
    }
    private saveCookies = (cookies: string): void => {
        this.parseCookies(cookies)
            .forEach(el => this.cookies.set(el[0], el[1]))
    }
    private getCookies = (): string => {
        let result = ''
        this.cookies.forEach((value, key) => result += (key + '=' + value + ' '))
        return result
    }
    private getCookieString = (response: Response): string =>  response.headers.get('set-cookie')
    private getHeaders = () => {
        return {
            cookie: this.getCookies()
        }
    }
    private parseCookies = (cookies: string): string[][] => {
        let arr = cookies.split(' ')
        return arr
            .filter(el => el.lastIndexOf('=') >= 0)
            .filter(el => !el.includes('path') && !el.includes('expires'))
            .map(elem => elem.split('='))
    }
    private getLoginForm = (username: string, password: string): FormData => {
        const form = new FormData()
        form.append('USER_LOGIN', username)
        form.append('USER_PASSWORD', password)
        form.append('AUTH_FORM', 'Y')
        form.append('TYPE', 'AUTH')
        form.append('backurl', '/personal/meters/')
        return form
    }
    private getMetersForm = (water: number, gas: number, electricity: { day: number, night: number }, sessionId: string): FormData => {
        const form = new FormData()
        form.append('action', 'set_meters')
        form.append('sessid', sessionId)
        form.append('indiccur1[21770]', water.toString())
        form.append('indiccur2[21770]', '0')
        form.append('indiccur1[21771]', gas.toString())
        form.append('indiccur2[21771]', '0')
        form.append('indiccur1[21772]', electricity.day.toString())
        form.append('indiccur2[21772]', electricity.night.toString())
        form.append('submit_btn', 'Сохранить')
        return form
    }
}