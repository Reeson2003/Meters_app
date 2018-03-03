import parse, {ParsedData} from '../domain/ImprovedParser'

const SIGNED_OUT_HTML = '../../meters_signed_out.html'
const EDIT_DISABLED_A_HTML = '../../meters_signed_in.html'
const EDIT_DISABLED_B_HTML = '../../meters_signed_in_2.html'
const EDIT_ENABLED = '../../meters_signed_in_3.html'

const signedOutResult: ParsedData = {
    userFullName: undefined,
    sessionId: undefined,
    meters: undefined
}

const editDisabledResult: ParsedData = {
    userFullName: '��������� ������� ���������� [arbuzo5428193]',
    sessionId: 'be9ca3e6f989ad2934589440bc5873b5',
    meters: {
        editable: false,
        water: {
            previous: 428,
            current: 455
        },
        gas: {
            previous: 5637,
            current: 5992
        },
        electricity: {
            day: {
                previous: 4795,
                current: 5131
            },
            night: {
                previous: 1881,
                current: 2004
            }
        }
    }
}

const editEnabledResult = {
    ...editDisabledResult,
    meters: {
        ...editDisabledResult.meters,
        editable: true
    }
}

// it('Successfully signed out parsed', () => {
//     expect(parse(SIGNED_OUT_HTML)).toEqual(signedOutResult)
// })

const run = () => {
    const path = EDIT_DISABLED_B_HTML
    const fs = require('fs')
    const file = fs.readFileSync(path, 'utf8')

    const res: ParsedData = parse(file)
    console.log(editEnabledResult)
}

run()