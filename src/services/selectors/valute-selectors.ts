import { RootState } from "../store";

export function valutesInfoSelector(state: RootState) {
    return state.valuteInfoData.valutes
}

export function valuteBaseSelector(state: RootState) {
    return state.valuteInfoData.base
}

export function isLoadingSelector(state: RootState) {
    return state.valuteInfoData.isLoading
}

export function isErrorSelector(state: RootState) {
    return state.valuteInfoData.isError
}