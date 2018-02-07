import Loader from './Loader';
import Parser from './Parser';

export default class Meters {
    data;
    login;
    password;

    constructor(login, password) {
        this.login = login;
        this.password = password;
        return this.initData(login, password);
    };

    initData = (login, password) => {
        return new Promise((resolve, reject) => {
            const loader = new Loader();
            loader.downLoad(login, password)
                .then((html) => {
                    try {
                        this.data = new Parser(html).toJson();
                        resolve(this);
                    } catch (e) {
                        reject(e);
                    }
                })
                .catch(e => {
                    reject(e);
                });
        });
    };

    signOut = () => {
        return new Loader().logOut();
    };

    setMeters = (gas, water, eDay, eNight) => {
        return new Promise((resolve, reject) => {

        });
    };
}