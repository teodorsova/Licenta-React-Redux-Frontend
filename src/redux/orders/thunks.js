import OrdersService from "../../services/OrdersService"
import Actions from './actions'

export const createOrderAsync = data => (dispatch) => {
    dispatch(Actions.orderCreateStart());

    OrdersService.createOrder(data)
        .then((response) => {
            dispatch(Actions.orderCreateSuccess(response.data))
        })
        .catch((error) => dispatch(Actions.orderCreateError(error)))
}

export const createFurnitureAsync = data => (dispatch) => {
    dispatch(Actions.furnitureCreateStart());

    OrdersService.createFurnitureAsync(data)
        .then((response) => dispatch(Actions.furnitureCreateSuccess(response.data)))
        .catch((error) => dispatch(Actions.furnitureCreateError(error)))
}

export const createFurnitureOrderAsync = data => (dispatch) => {
    dispatch(Actions.furnitureOrderCreateStart());

    OrdersService.createFurnitureOrderAsync(data)
        .then((response) => dispatch(Actions.furnitureOrderCreateSuccess(response.data)))
        .catch((error) => dispatch(Actions.furnitureOrderCreateError(error)))
}

export const getOrdersAsync = UserId => (dispatch) => {
    dispatch(Actions.ordersLoadStart());
    OrdersService.getAllOrders(UserId)
        .then((response) => dispatch(Actions.ordersLoadSuccess(response.data)))
        .catch((error) => dispatch(Actions.ordersLoadError(error)))
}

export const getFurnituresForOrderAsync = data => (dispatch) => {
    dispatch(Actions.furnituresLoadStart());
    OrdersService.getFurnituresForOrder(data)
        .then((response) => dispatch(Actions.furnituresLoadSuccess(response.data)))
        .catch((error) => dispatch(Actions.furnituresLoadError(error)))
}

export const stopOrderLoad = () => dispatch => {
    dispatch(Actions.ordersLoadStop())
}

export const getFurnituresForCompanyAsync = userId => (dispatch) => {
    dispatch(Actions.furnituresForCompanyLoadStart());
    OrdersService.getFurnituresForCompanyAccount(userId)
        .then((response) => dispatch(Actions.furnituresForCompanyLoadSuccess(response.data)))
        .catch((error) => dispatch(Actions.furnituresForCompanyLoadError(error)))
}

export const updateFurnitureStatusAsync = (id, status) => (dispatch) => {
    dispatch(Actions.furnitureUpdateStatusStart())
    OrdersService.updateFurnitureStatus(id, status)
        .then((response) => dispatch(Actions.furnitureUpdateStatusSuccess(response.data)))
        .catch((error) => dispatch(Actions.furnitureUpdateStatusError(error)));
}

export const resetOrderState = () => (dispatch) => {
    dispatch(Actions.resetInitialStatus())
}