import { FAVORITES_ADD, FAVORITES_DELETE } from "../constants/favorites-constants"

type TFavoriteState = {
    favorites: Array<string>
}

type TFavoritesAddAction = {
    type: typeof FAVORITES_ADD,
    valuteCode: string
}

type TFavoritesDeleteAction = {
    type: typeof FAVORITES_DELETE,
    valuteCode: string
}

type TFavoritesActions = TFavoritesAddAction | TFavoritesDeleteAction

const defaultState: TFavoriteState = {
    favorites: []
}

export function favoritesReducer(state = defaultState, action: TFavoritesActions) {
    switch (action.type) {
        case FAVORITES_ADD: {
            return {
                ...state, favorites: [...state.favorites, action.valuteCode]
            }
        }

        case FAVORITES_DELETE: {
            return {
                ...state, favorites: state.favorites.filter(favorite => favorite !== action.valuteCode)
            }
        }

        default:
            return state
    }
}