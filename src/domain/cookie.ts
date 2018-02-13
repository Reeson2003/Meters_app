const COOKIE = 'PHPSESSID=2u8blel2ptk6bc87tvhl7dtbs0; path=/, ' +
    'BITRIX_SM_GUEST_ID=65015; expires=Thu, 07-Feb-2019 10:42:07 GMT; path=/, ' +
    'BITRIX_SM_LAST_VISIT=12.02.2018+12%3A42%3A07; expires=Thu, 07-Feb-2019 10:42:07 GMT; path=/'

const run = () => {
    let arr = COOKIE.split(' ')
    let res: Map<string, string> = new Map<string, string>()
    const filter: string[][] = arr
        .filter((el) => {
            return el.lastIndexOf('=') >= 0
        })
        .filter((el) => {
            return !el.includes('path') && !el.includes('expires')
        })
        .map(el => el.split('='))
        .forEach(el => res.set(el[0], el[1]))
    console.log(res)
}

run()