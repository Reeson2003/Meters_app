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

export const getStorage = (): Storage => new StorageImpl()

class StorageImpl implements Storage {
    save = (user: User): Promise<void> => {
        return AsyncStorage
            .setItem(keys.LOG, user.username)
            .then(() => {
                return AsyncStorage.setItem(keys.PASS, user.password)
            })
    }
    load = (): Promise<User> => {
        return new Promise<User>((resolve, reject) => {
            let login = undefined
            AsyncStorage
                .getItem(keys.LOG)
                .then((log) => {
                    login = log
                    return AsyncStorage.getItem(keys.PASS)
                })
                .then((pass) => {
                    resolve({
                        username: login,
                        password: pass,
                        fullName: undefined
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