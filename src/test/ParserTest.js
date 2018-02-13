import parse from '../../artifacts/domain/Parser';

const run = ()=>{
    const path = '../../meters_signed_in_3.html';
    const fs = require('fs');
    const file = fs.readFileSync(path, "utf8");

    const res = parse(file)
    console.log(res)
};

run();