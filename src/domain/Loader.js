////uncomment to test on node.js
import FormData from 'form-data';
import fetch from 'node-fetch';

const METERS_URL = "https://izora.info/personal/meters/?login=yes";
const LOGOUT_URL = 'https://izora.info/auth/?logout=yes';

export default class Loader {
    downLoad = (username, password) => {
        const form = new FormData();
        form.append("USER_LOGIN", username);
        form.append("USER_PASSWORD", password);
        form.append("AUTH_FORM", "Y");
        form.append("TYPE", "AUTH");
        form.append("backurl", "/personal/meters/");

        return new Promise((resolve, reject) => {
            fetch(METERS_URL, {
                method: 'post',
                body: form
            }).then(function (ok) {
               return ok.text();
            }).then(function (ok1) {
                resolve(ok1);
            }).catch((error) => {
                reject(error)
            });
        })
    };

    logOut = () => {
        return new Promise((resolve, reject) => {
            fetch(LOGOUT_URL)
                .then(resolve())
                .catch(reject());
        });
    }
}