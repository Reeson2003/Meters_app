import {AsyncStorage} from 'react-native'

export interface Storage {
    save: <T>(key: string, value: T) => Promise<void>
    load: <T>(key: string) => Promise<T>
    remove: (key: string) => Promise<void>
}

export const getStorage = (): Storage => new StorageImpl()

class StorageImpl implements Storage {
    save = <T>(key: string, value: T): Promise<void> => AsyncStorage
        .setItem(key, JSON.stringify(value))
    load = <T>(key: string): Promise<T> => AsyncStorage
        .getItem(key)
        .then(value => JSON.parse(value))
    remove = (key: string): Promise<void> => AsyncStorage
            .removeItem(key)
}