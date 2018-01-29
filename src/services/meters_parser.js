import {DOMParser} from 'react-native-html-parser';

export default function parse(html) {
    const parser = new DOMParser({
        errorHandler: {
            warning: () => {},
            error: () => {},
            fatalError: () => {}
        }
    });
    const doc = parser.parseFromString(html, "text/html");
    const table = doc.querySelect('table')[1];
    const body = table.querySelect('tbody')[0];
    const row = body.querySelect('tr');
    return rowToArray(row);
}

const rowToArray = (row) => {
    return row.map(parseRow);
};

const parseRow = (raw) => {
    const td = raw.querySelect('td');
    return {
        name: parseName(td[0]),
        day: parseData(td[1]),
        night: parseData(td[2])
    };
};

const parseName = (raw) => {
    return raw.firstChild.data.trim();
};

const parseData = (raw) => {
    const text = raw.firstChild.data;
    const data = text.trim().split('/');
    return {
        previous: data[0] ? data[0] : "",
        current: data[1] ? data[1] : ""
    };
};