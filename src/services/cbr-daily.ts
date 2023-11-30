export type TValuteInfo = {
    ID: string,
    NumCode: string,
    CharCode: string,
    Nominal: number,
    Name: string,
    Value: number,
    Previous: number
}

type ResponseData = {
    Date: Date,
    PreviousDate: Date,
    PreviousURL: string,
    Timestamp: number,
    Valute: {
        [key: string]: TValuteInfo
    }
}

const requestURL = "https://www.cbr-xml-daily.ru/daily_json.js";
export async function getCurrentCourse() {
    const response = await fetch(requestURL)
    const data = await response.json() as ResponseData
    const valuteCourses = [...Object.values(data.Valute), {
        ID: 'RUB_ID',
        NumCode: 'RUB_NumCode',
        CharCode: 'RUB',
        Nominal: 1,
        Name: 'Российский рубль',
        Value: 1,
        Previous: 1
    }]

    return valuteCourses
}