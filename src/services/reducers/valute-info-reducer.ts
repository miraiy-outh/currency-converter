import { calculateConvertValue, calculateValueAndNominal } from "../../utils/calculate-utils"
import { TValuteInfo } from "../cbr-daily"
import { BASE_INPUT_VALUE_SET, CONVERT_COUNT, CONVERT_INPUT_VALUE_SET, IS_ERROR_SET, IS_LOADING_SET, VALUTE_BASE_CHANGE, VALUTE_CODES_SET, VALUTE_CONVERT_CHANGE, VALUTE_SET } from "../constants/valute-info-constants"
import { baseInputValueSelector } from "../selectors/valute-selectors"

type TValuteState = {
    base: string,
    convert: string,
    baseInputValue: number,
    convertInputValue: number,
    valuteCodes: string[],
    valutes: TValuteInfo[],
    isLoading: boolean,
    isError: boolean
    isValuteCodesLoaded: boolean
}

type TValuteSetAction = {
    type: typeof VALUTE_SET,
    valutes: TValuteInfo[]
}

type TValuteBaseChangeAction = {
    type: typeof VALUTE_BASE_CHANGE,
    charCode: string
}

type TValuteConvertChangeAction = {
    type: typeof VALUTE_CONVERT_CHANGE,
    charCode: string
}

type TBaseInputValueSetAction = {
    type: typeof BASE_INPUT_VALUE_SET,
    inputValue: number
}

type TConvertInputValueSetAction = {
    type: typeof CONVERT_INPUT_VALUE_SET,
    inputValue: number
}

type TConvertCount = {
    type: typeof CONVERT_COUNT
}

type TValuteCodesSetAction = {
    type: typeof VALUTE_CODES_SET,
    valuteCodes: string[]
}

type TIsLoadingSetAction = {
    type: typeof IS_LOADING_SET,
    isLoading: boolean
}

type TIsErrorSetAction = {
    type: typeof IS_ERROR_SET,
    isError: boolean
}

type TValuteActions = TValuteSetAction | TValuteBaseChangeAction | TIsLoadingSetAction | TIsErrorSetAction |
    TValuteCodesSetAction | TValuteConvertChangeAction | TBaseInputValueSetAction | TConvertInputValueSetAction | TConvertCount

const defaultState: TValuteState = {
    base: 'RUB',
    convert: 'USD',
    baseInputValue: 1,
    convertInputValue: 0,
    valuteCodes: ['RUB'],
    valutes: [],
    isLoading: true,
    isError: false,
    isValuteCodesLoaded: false
}

export function valuteReducer(state = defaultState, action: TValuteActions) {
    switch (action.type) {

        case VALUTE_SET: {
            const baseValuteInfo = action.valutes.find(valute => valute.CharCode === state.base);
            if (!baseValuteInfo) return state
            const { Value } = baseValuteInfo
            const newValutes = action.valutes.map((valute) => {
                const { value, nominal } = calculateValueAndNominal(valute.Value / Value, valute.Nominal)

                return {
                    ...valute,
                    Value: value,
                    Nominal: nominal
                }
            })
            return {
                ...state, valutes: newValutes
            }
        }

        case VALUTE_BASE_CHANGE: {
            return {
                ...state, base: action.charCode
            }
        }

        case VALUTE_CONVERT_CHANGE: {
            return {
                ...state, convert: action.charCode
            }
        }

        case BASE_INPUT_VALUE_SET: {
            return {
                ...state, baseInputValue: action.inputValue
            }
        }

        case CONVERT_INPUT_VALUE_SET: {
            return {
                ...state, convertInputValue: action.inputValue
            }
        }

        case CONVERT_COUNT: {
            const { convert, baseInputValue } = state
            const convertValuteInfo = state.valutes.find(valute => valute.CharCode === convert);
            if (!convertValuteInfo) return state
            const { Value, Nominal } = convertValuteInfo
            const convertCount = calculateConvertValue(Value, Nominal, baseInputValue)
            return {
                ...state, convertInputValue: convertCount
            }
        }


        case VALUTE_CODES_SET: {
            return {
                ...state, valuteCodes: action.valuteCodes, isValuteCodesLoaded: true
            }
        }

        case IS_LOADING_SET: {
            return {
                ...state, isLoading: action.isLoading
            }
        }

        case IS_ERROR_SET: {
            return {
                ...state, isError: action.isError
            }
        }

        default:
            return state
    }
}