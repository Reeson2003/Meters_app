import Puppeteer, {Page} from 'puppeteer'
import {Loader} from './LoaderInterface'
import {Meter, Meters} from './Types'

const USERNAME_SELECTOR = '#auth-login'
const PASSWORD_SELECTOR = '#auth-password'
const LOGIN_BUTTON_SELECTOR = '#auth-form > button'

const WATER_METER_SELECTOR = '#middle > div > form > table > tbody > tr:nth-child(1) > td:nth-child(2)'
const GAS_METER_SELECTOR = '#middle > div > form > table > tbody > tr:nth-child(2) > td:nth-child(2)'
const ELECTRICITY_DAY_METER_SELECTOR = '#middle > div > form > table > tbody > tr:nth-child(3) > td:nth-child(2)'
const ELECTRICITY_NIGHT_METER_SELECTOR = '#middle > div > form > table > tbody > tr:nth-child(3) > td:nth-child(3)'

class HeadlessLoader implements Loader {
    private username
    private password
    private meters: Promise<Meters>

    static getLoader = async (username: string, password: string): Promise<Loader> => {
        const loader = new HeadlessLoader(username, password)
        await loader.loadMeters()
        return loader
    }
    getMeters = (): Promise<Meters> => {
        return this.meters
    }
    setMeters = (water: number, gas: number, electricity: { day: number; night: number }): Promise<boolean> => {
        return undefined
    }
    logOut = (): Promise<void> => {
        return undefined
    }
    private constructor(username, password) {
        this.username = username
        this.password = password
    }
    private loadMeters = async (): Promise<void> => {
        const browser = await Puppeteer.launch({headless: false})
        try {
            const page = (await browser.pages())[0]
            await page.goto('https://izora.info/personal/meters/')
            await page.waitFor(1000)
            await page.type(USERNAME_SELECTOR, this.username)
            await page.type(PASSWORD_SELECTOR, this.password)
            await Promise.all([
                page.click(LOGIN_BUTTON_SELECTOR),
                page.waitForNavigation({waitUntil: 'networkidle0'})
            ])
            this.meters = this.parseMeters(page)
            // await page.waitFor(1000)
            await browser.close()
        } catch (e) {
            await browser.close()
        }
        return undefined
    }
    private parseMeters = async (page: Page): Promise<Meters> => {
        const water: Meter = await this.getMeter(page, WATER_METER_SELECTOR)
        const gas: Meter = await this.getMeter(page, GAS_METER_SELECTOR)
        const elDay: Meter = await this.getMeter(page, ELECTRICITY_DAY_METER_SELECTOR)
        const elNight: Meter = await this.getMeter(page, ELECTRICITY_NIGHT_METER_SELECTOR)
        return {
            water: water,
            gas: gas,
            electricity: {
                day: elDay,
                night: elNight
            },
            editable: false
        }
    }
    private getMeter = async (page: Page, selector: string): Promise<Meter> => {
        const elem = await this.getBoth(page, selector)
        return this.elemToMeter(elem)
    }
    private getBoth = (page: Page, selector: string): Promise<string> => {
        return page.evaluate((s) => {
            let el = document.querySelector(s) as HTMLTextAreaElement
            return el.innerText
        }, selector)
    }
    private elemToMeter = (elem: string): Meter => {
        const elems = elem.trim().split('/')
        return {
            previous: Number.parseInt(elems[0]),
            current: Number.parseInt(elems[1])
        }
    }
}

const run = () => {
    HeadlessLoader.getLoader('arbuzo5428193', '34551801')
        .then(loader => loader.getMeters())
        .then(meters => {
            console.log(meters)
        })
        .catch(e => console.error(e))
}

run()