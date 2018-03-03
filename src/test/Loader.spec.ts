/// <reference types="node"/>
import getLoader from '../src/domain/Loader'

it('load test', () => {
    const username = 'arbuzo5428193'
    const password = '34551801'
    const loader = getLoader(username, password)
    loader.then((result) => {
        console.log(result)
        expect(result).toBeDefined()
    })
})