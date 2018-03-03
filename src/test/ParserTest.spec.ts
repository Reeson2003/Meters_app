import parse, {ParsedData} from '../domain/ImprovedParser'

const run = () => {
    const path = '../../meters_signed_in_3.html'
    const fs = require('fs')
    const file = fs.readFileSync(path, 'utf8')

    const res: ParsedData = parse(file)
    console.log(res)
}

run()