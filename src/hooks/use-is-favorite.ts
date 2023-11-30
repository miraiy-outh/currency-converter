import { favoritesSelector } from "../services/selectors/favorites-selector";
import { useSelector } from "./redux-hooks";

export function useIsFavorite(valuteCode: string) {
    const favorites = useSelector(favoritesSelector);
    return favorites.some((favorite) => favorite === valuteCode)
}