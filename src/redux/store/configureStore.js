import { applyMiddleware, createStore, compose, configureStore, combineReducers } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/lib/persistReducer";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk"
import userReducer from "../reducers/userReducer";
import subscriptionReducer from "../reducers/subscriptionReducer";
import orderReducer from "../reducers/orderReducer";
import azureReducer from "../reducers/azureReducer";

const persistConfig = {
    key: 'state',
    storage
}

const combinedReducer = combineReducers({
    user: userReducer,
    subscription: subscriptionReducer,
    orders: orderReducer,
    azure: azureReducer
})

const rootReducer = (state, action) => {
    if(action.type === 'USER_LOGIN_SUCCESS') {
        state = undefined
    }
    return combinedReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk:{},
            serializableCheck: false,
        }),
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;