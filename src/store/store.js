import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "../features/progress/progressSlice"
import { persistStore, persistReducer } from "redux-persist";
import storageModule from "redux-persist/lib/storage";
const storage = storageModule.default;

const persistConfig = {
    key: "root",
    storage
};

const persistedProgressReducer = persistReducer(persistConfig, progressReducer)

export const store = configureStore({
    reducer: {
        progress: persistedProgressReducer
    }
})

export const persistor = persistStore(store);