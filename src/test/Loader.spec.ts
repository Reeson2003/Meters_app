import Loader from '../domain/Loader'

const run = () => {
    const username = 'arbuzo5428193'
    const password = '34551801'
    const loader = new Loader()
    const res = loader.download(username, password)
    res.then((result) => {
        console.log(result)
    })
}

run()