import actionTypes from "../orders/actionTypes";
import initialStates from "../orders/initialStates"

const orderReducer = (state = initialStates, { type, payload }) => {
    switch (type) {
        case actionTypes.ORDER_CREATE_START:
            return {
                ...state,
                successfulCreation: false,
                order: undefined
            }

        case actionTypes.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                successfulCreation: true,
                order: payload
            }

        case actionTypes.ORDER_CREATE_ERROR:
            return {
                ...state,
                successfulCreation: false,
                errorMessage: payload
            }

        case actionTypes.FURNITURE_CREATE_START:
            return {
                ...state,
                successfulFurnitureCreation: false,
                furniture: undefined
            }

        case actionTypes.FURNITURE_CREATE_SUCCESS:
            return {
                ...state,
                successfulFurnitureCreation: true,
                furniture: payload
            }

        case actionTypes.FURNITURE_CREATE_ERROR:
            return {
                ...state,
                successfulFurnitureCreation: false,
                errorMessage: payload
            }

        case actionTypes.FURNITURE_ORDER_CREATE_START:
            return {
                ...state,
                successfulFurnitureOrderCreation: false
            }

        case actionTypes.FURNITURE_ORDER_CREATE_SUCCESS:
            return {
                ...state,
                successfulFurnitureOrderCreation: true,
            }

        case actionTypes.FURNITURE_ORDER_CREATE_ERROR:
            return {
                ...state,
                successfulFurnitureOrderCreation: false,
                errorMessage: payload
            }

        case actionTypes.ORDERS_LOAD_START:
            return {
                ...state,
                successfulOrdersLoad: false
            }

        case actionTypes.ORDERS_LOAD_SUCCESS:
            return {
                ...state,
                successfulOrdersLoad: true,
                orders: payload
            }

        case actionTypes.ORDERS_LOAD_ERROR:
            return {
                ...state,
                successfulOrdersLoad: false,
                errorMessage: payload
            }
        case actionTypes.ORDERS_LOAD_STOP:
            return {
                ...state,
                successfulOrdersLoad: false,
            }

        case actionTypes.FURNITURES_LOAD_START:
            return {
                ...state,
                furnituresSuccessfulLoad: false,
                furnitures: []
            }

        case actionTypes.FURNITURES_LOAD_SUCCESS:
            return {
                ...state,
                furnituresSuccessfulLoad: true,
                furnitures: [...state.furnitures, payload]
            }

        case actionTypes.FURNITURES_LOAD_ERROR:
            return {
                ...state,
                furnituresSuccessfulLoad: false,
                errorMessage: payload
            }

        case actionTypes.FURNITURES_FOR_COMPANY_LOAD_START:
            return {
                ...state,
                successfulFurnitureForCompaniesCreation: false
            }

        case actionTypes.FURNITURES_FOR_COMPANY_LOAD_SUCCESS:
            return {
                ...state,
                successfulFurnitureForCompaniesCreation: true,
                ordersForCompanies: payload
            }

        case actionTypes.FURNITURES_FOR_COMPANY_LOAD_ERROR:
            return {
                ...state,
                successfulFurnitureForCompaniesCreation: false,
                errorMessage: payload
            }

        case actionTypes.FURNITURE_UPDATE_STATUS_START:
            return {
                ...state,
                successfulFurnitureStatusUpdate: false
            }

        case actionTypes.FURNITURE_UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                successfulFurnitureStatusUpdate: true,
            }

        case actionTypes.FURNITURE_UPDATE_STATUS_ERROR:
            return {
                ...state,
                successfulFurnitureStatusUpdate: false,
                errorMessage: payload
            }

        case actionTypes.RESET_INITIAL_STATUS:
            return {
                ...initialStates
            }


        default: return state
    }

}

export default orderReducer;