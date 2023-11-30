import { TValuteInfo } from "../cbr-daily"
import { IS_ERROR_SET, IS_LOADING_SET, VALUTE_BASE_CHANGE, VALUTE_SET } from "../constants/valute-info-constants"

type TValuteState = {
    base: string,
    valutes: TValuteInfo[]
    isLoading: boolean
    isError: boolean
}

type TValuteSetAction = {
    type: typeof VALUTE_SET,
    base: string
    valutes: TValuteInfo[]
}

type TValuteBaseChangeAction = {
    type: typeof VALUTE_BASE_CHANGE,
    charCode: string
}

type TIsLoadingSetAction = {
    type: typeof IS_LOADING_SET,
    isLoading: boolean
}

type TIsErrorSetAction = {
    type: typeof IS_ERROR_SET,
    isError: boolean
}

type TValuteActions = TValuteSetAction | TValuteBaseChangeAction | TIsLoadingSetAction | TIsErrorSetAction

const defaultState: TValuteState = {
    base: 'RUB',
    valutes: [],
    isLoading: true,
    isError: false
}

export function valuteReducer(state = defaultState, action: TValuteActions) {
    switch (action.type) {

        case VALUTE_SET: {
            const baseValuteInfo = action.valutes.find(valute => valute.CharCode === action.base);
            if (!baseValuteInfo) return state
            const { Value } = baseValuteInfo
            const newValutes = action.valutes.map((valute) => {
                return {
                    ...valute,
                    Value: Math.round((valute.Value / Value) * 10000) / 10000
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