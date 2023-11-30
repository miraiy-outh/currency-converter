import { calculateValueAndNominal } from "../../utils/calculate-value-and-nominal"
import { TValuteInfo } from "../cbr-daily"
import { IS_ERROR_SET, IS_LOADING_SET, VALUTE_BASE_CHANGE, VALUTE_CODES_SET, VALUTE_SET } from "../constants/valute-info-constants"

type TValuteState = {
    base: string,
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

type TValuteActions = TValuteSetAction | TValuteBaseChangeAction | TIsLoadingSetAction | TIsErrorSetAction | TValuteCodesSetAction

const defaultState: TValuteState = {
    base: 'RUB',
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

        case VALUTE_CODES_SET: {
            return {
                ...state, valuteCodes: action.valuteCodes
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