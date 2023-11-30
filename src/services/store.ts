import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import { valuteReducer } from "./reducers/valute-info-reducer";
import { favoritesReducer } from "./reducers/favorites-reducer";

const rootReducer = combineReducers({
    valuteInfoData: valuteReducer,
    favoritesData: favoritesReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [],
        preloadedState
    })

    return store
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];