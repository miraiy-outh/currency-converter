import { RootState } from "../store";

export function favoritesSelector(state: RootState) {
    return state.favoritesData.favorites
}