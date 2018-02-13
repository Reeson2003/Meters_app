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
        .then(() => _loader.setMeters(incrementMeters(_meters)))
        .then(() => _loader.getMeters())
        .then(meters => {
            console.log(meters)
        })
        .catch(e => console.error(e))
};

const incrementMeters = (meters) => {
    return {
        water: {
            previous: meters.water.previous,
            current: 1 + parseInt(meters.water.current, 10)
        },
        gas: {
            previous: meters.gas.previous,
            current: meters.gas.current
        },
        electricity: {
            day: {
                previous: meters.electricity.day.previous,
                current: meters.electricity.day.current
            },
            night: {
                previous: meters.electricity.night.previous,
                current: meters.electricity.night.current
            }
        }
    }
}

run();