//// uncomment to test on node.js
import FormData from 'form-data'
import fetch, {Response} from 'node-fetch'

const METERS_URL = 'https://izora.info/personal/meters/?login=yes'
const LOGOUT_URL = 'https://izora.info/auth/?logout=yes'

interface Loader {
    download: (username: string, password: string) => Promise<string>
    logOut: () => Promise<void>
}

export default class LoaderImpl implements Loader {
    download = (username: string, password: string): Promise<string> => {
        const form = new FormData()
        form.append('USER_LOGIN', username)
        form.append('USER_PASSWORD', password)
        form.append('AUTH_FORM', 'Y')
        form.append('TYPE', 'AUTH')
        form.append('backurl', '/personal/meters/')
        return fetch(METERS_URL, {
                method: 'post',
                body: form
            })
            .then((response: Response) => {
                return response.text()
            })
    }

    logOut = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            fetch(LOGOUT_URL)
                .then((_response: Response) => {
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }
}