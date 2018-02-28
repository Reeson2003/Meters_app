import {getLoader} from '../../artifacts/domain/Loader';

const run = async () => {
    try {
        const username = 'arbuzo5428193';
        const password = '34551801';
        const loader = await getLoader(username, password)
        const meters = await loader.getMeters()
        console.log(meters)
        const water = inc(meters.water.previous)
        const gas = inc(meters.gas.previous)
        const electricity = {
            day: inc(meters.electricity.day.previous),
            night: inc(meters.electricity.night.previous)
        }
        await loader.setMeters(water, gas, electricity)
        const newMeters = await loader.getMeters()
        console.log(newMeters)
    } catch (e) {
        console.warn(e)
    }
};

const inc = value => 2 + parseInt(value)

run();