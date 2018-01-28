const URL = "https://izora.info/personal/meters/?login=yes";
const PASSWORD = "345518011";
const LOGIN = "arbuzo5428193";

export default function fetchData(login, password) {
    const form = new FormData();
    form.append("USER_LOGIN", login);
    form.append("USER_PASSWORD", password);
    form.append("AUTH_FORM", "Y");
    form.append("TYPE", "AUTH");
    form.append("backurl", "/personal/meters/");

    return new Promise(function (resolve, reject) {
        fetch(URL,{
            method: 'post',
            body: form
        }).then(function (ok) {
            ok.text()
                .then(function (ok1) {
                resolve(ok1);
            }).catch((error)=>{reject(error)})
        }).catch((error)=>{reject(error)});
    })
}