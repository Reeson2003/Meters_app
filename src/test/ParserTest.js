import Parser from '../domain/Parser';

const run = ()=>{
    const path = '../../meters_signed_in.html';
    const fs = require('fs');
    const file = fs.readFileSync(path, "utf8");
    const parser = new Parser(file);
    console.log(parser.toJson());
};

run();