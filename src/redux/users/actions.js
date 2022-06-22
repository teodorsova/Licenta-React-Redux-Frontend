import userActionTypes from "./actionTypes";

const userLoginStart = (data) => ({
    type: userActionTypes.USER_LOGIN_START,
})

const userLoginSuccess = () => ({
    type: userActionTypes.USER_LOGIN_SUCCESS,
})

const userLoginError = (errorMessage) => ({
    type: userActionTypes.USER_LOGIN_ERROR,
    payload: errorMessage
})

const userCheckStart = (data) => ({
    type: userActionTypes.USER_CHECK_START,
})

const userCheckSuccess = (user) => ({
    type: userActionTypes.USER_CHECK_SUCCESS,
    payload: user
})

const userCheckError = (errorMessage) => ({
    type: userActionTypes.USER_CHECK_ERROR,
    payload: errorMessage
})

const userLogoutStart = () => ({
    type: userActionTypes.USER_LOGOUT_START
})

const userLogoutSuccess = () => ({
    type: userActionTypes.USER_LOGOUT_SUCCESS,
})

const userUpdateStart = () => ({
    type: userActionTypes.USER_UPDATE_START
})

const userUpdateSuccess = (successMessage) => ({
    type: userActionTypes.USER_UPDATE_SUCCESS,
    payload: successMessage
})

const userUpdateError = (errorMessage) => ({
    type: userActionTypes.USER_UPDATE_ERROR,
    payload: errorMessage,
})

const userRegisterStart = () => ({
    type: userActionTypes.USER_REGISTER_START,
})

const userRegisterSuccess = () => ({
    type: userActionTypes.USER_REGISTER_SUCCESS,
})

const userRegisterError = (errorMessage) => ({
    type: userActionTypes.USER_REGISTER_ERROR,
    payload: errorMessage
})

const shoppingCartAdd = (item) => ({
    type: userActionTypes.SHOPPING_CART_ADD,
    payload: item
})

const shoppingCartRemove = (item) => ({
    type: userActionTypes.SHOPPING_CART_ADD,
    payload: item
})

export default {
    userLoginStart,
    userLoginSuccess,
    userLoginError,
    userCheckStart,
    userCheckSuccess,
    userCheckError,
    userLogoutStart,
    userLogoutSuccess,
    userUpdateStart,
    userUpdateSuccess,
    userUpdateError,
    userRegisterStart,
    userRegisterSuccess,
    userRegisterError,
    shoppingCartAdd,
    shoppingCartRemove
}