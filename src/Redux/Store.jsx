import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userSlice from './Users';
import  companySlice  from "./Companyees";


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = {
    user: persistReducer(persistConfig, userSlice),
    company: persistReducer(persistConfig, companySlice),
};

const Store = configureStore({
    reducer: rootReducer,
});
const persistor = persistStore(Store);

export { Store, persistor };




