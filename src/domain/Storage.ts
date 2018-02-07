import {AsyncStorage} from 'react-native'
import {User} from './Types'

const keys = {
    LOG: 'LOGIN',
    PASS: 'PASSWORD'
}

export interface Storage {
    save: (user: User) => Promise<void>
    load: () => Promise<User>
    clear: () => Promise<void>
}

export default class StorageImpl implements Storage {
    save = (user: User): Promise<void> => {
        return AsyncStorage
            .setItem(keys.LOG, user.username)
            .then(() => {
                return AsyncStorage.setItem(keys.PASS, user.password)
            })
    }
    load = (): Promise<User> => {
        return new Promise<User>((resolve, reject) => {
            AsyncStorage
                .getItem(keys.LOG)
                .then((log) => {
                    return AsyncStorage
                        .getItem(keys.PASS)
                        .then((pass) => {
                            resolve({
                                username: log,
                                password: pass,
                                fullName: undefined
                            })
                        })
                })
                .catch((e) => {
                    reject(e)
                })
        })
    }
    clear = (): Promise<void> => {
        return AsyncStorage
            .removeItem(keys.LOG)
            .then(() => {
                return AsyncStorage.removeItem(keys.PASS)
            })
    }

}