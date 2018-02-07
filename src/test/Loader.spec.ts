import Loader from '../domain/Loader'

it('load test', () => {
    const username = 'arbuzo5428193'
    const password = '34551801'
    const loader = new Loader()
    const res = loader.download(username, password)
    res.then((result) => {
        console.log(result)
        expect(result).toBeDefined()
    })
})