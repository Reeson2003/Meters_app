import {getLoader} from '../../artifacts/domain/Loader';

const run = () => {
    const username = 'arbuzo5428193';
    const password = '34551801';
    let _loader = undefined
    let _meters = undefined
    getLoader(username, password)
        .then(loader => {
            _loader = loader
        })
        .then(() => {
            return _loader.getMeters()
        })
        .then((meters) => {
            console.log(meters)
            _meters = meters
        })
        .then(() => {
            const water = inc(_meters.water.previous)
            const gas = inc(_meters.gas.previous)
            const electricity = {
                day: inc(_meters.electricity.day.previous),
                night: inc(_meters.electricity.night.previous)
            }
            return _loader.setMeters(water, gas, electricity)
        })
        .then(() => _loader.getMeters())
        .then(meters => {
            console.log(meters)
        })
        .catch(e => console.error(e))
};

const inc = (value) => {
    return 2 + parseInt(value)
}

run();