import ordersActionTypes from './actionTypes'

const orderCreateStart = () => ({
    type: ordersActionTypes.ORDER_CREATE_START
})

const orderCreateSuccess = (data) => ({
    type: ordersActionTypes.ORDER_CREATE_SUCCESS,
    payload: data
})

const orderCreateError = (error) => ({
    type: ordersActionTypes.ORDER_CREATE_ERROR,
    errorMessage: error
})

const furnitureCreateStart = () => ({
    type: ordersActionTypes.FURNITURE_CREATE_START
})

const furnitureCreateSuccess = (data) => ({
    type: ordersActionTypes.FURNITURE_CREATE_SUCCESS,
    payload:data
})

const furnitureCreateError = (error) => ({
    type: ordersActionTypes.FURNITURE_CREATE_SUCCESS,
    errorMessage: error
})

const furnitureOrderCreateStart = () => ({
    type: ordersActionTypes.FURNITURE_ORDER_CREATE_START
})

const furnitureOrderCreateSuccess = (data) => ({
    type: ordersActionTypes.FURNITURE_ORDER_CREATE_SUCCESS,
    payload:data
})

const furnitureOrderCreateError = (error) => ({
    type: ordersActionTypes.FURNITURE_ORDER_CREATE_ERROR,
    errorMessage: error
})

const ordersLoadStart = () => ({
    type: ordersActionTypes.ORDERS_LOAD_START,
})

const ordersLoadSuccess = (data) => ({
    type: ordersActionTypes.ORDERS_LOAD_SUCCESS,
    payload:data
})

const ordersLoadError = (error) => ({
    type: ordersActionTypes.ORDERS_LOAD_ERROR,
    payload:error
})

const furnituresLoadStart = () => ({
    type: ordersActionTypes.FURNITURES_LOAD_START,
})

const furnituresLoadSuccess = (data) => ({
    type: ordersActionTypes.FURNITURES_LOAD_SUCCESS,
    payload:data
})

const furnituresLoadError = (error) => ({
    type: ordersActionTypes.FURNITURES_LOAD_ERROR,
    payload:error
})

const ordersLoadStop = () => ({
    type: ordersActionTypes.ORDERS_LOAD_STOP
})

const furnituresForCompanyLoadStart = () => ({
    type: ordersActionTypes.FURNITURES_FOR_COMPANY_LOAD_START
})

const furnituresForCompanyLoadSuccess = (data) => ({
    type: ordersActionTypes.FURNITURES_FOR_COMPANY_LOAD_SUCCESS,
    payload: data
})

const furnituresForCompanyLoadError = (error) => ({
    type: ordersActionTypes.FURNITURES_FOR_COMPANY_LOAD_ERROR,
    payload: error
})

const furnitureUpdateStatusStart = () => ({
    type: ordersActionTypes.FURNITURE_UPDATE_STATUS_START
})

const furnitureUpdateStatusSuccess = (data) => ({
    type: ordersActionTypes.FURNITURE_UPDATE_STATUS_SUCCESS,
    payload: data
})

const furnitureUpdateStatusError = (error) => ({
    type: ordersActionTypes.FURNITURE_UPDATE_STATUS_ERROR,
    payload: error
})

const resetInitialStatus = () => ({
    type: ordersActionTypes.RESET_INITIAL_STATUS
})


export default {
    orderCreateStart,
    orderCreateSuccess,
    orderCreateError,
    furnitureCreateStart,
    furnitureCreateSuccess,
    furnitureCreateError,
    furnitureOrderCreateStart,
    furnitureOrderCreateSuccess,
    furnitureOrderCreateError,
    ordersLoadStart,
    ordersLoadStart,
    ordersLoadSuccess,
    ordersLoadStop,
    ordersLoadError,
    furnituresLoadStart,
    furnituresLoadSuccess,
    furnituresLoadError,
    furnituresForCompanyLoadStart,
    furnituresForCompanyLoadSuccess,
    furnituresForCompanyLoadError,
    furnitureUpdateStatusStart,
    furnitureUpdateStatusSuccess,
    furnitureUpdateStatusError,
    resetInitialStatus
}