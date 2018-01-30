import Loader from '../domain/Loader';

const run = () => {
    const username = 'arbuzo5428193';
    const password = '';
    const loader = new Loader();
    const res = loader.downLoad(username, password);
    res.then((result)=>{
        console.log(result)
    })
};

run();