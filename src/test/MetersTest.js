import Meters from '../domain/Meters';

const run = () => {
    const username = 'arbuzo5428193';
    const password = '';
    const metersObj = new Meters(username, password);
    metersObj
        .then((meters) => {
            console.log(meters.data);
        })
        .catch(e => {
            console.log(e);
        })
};

run();