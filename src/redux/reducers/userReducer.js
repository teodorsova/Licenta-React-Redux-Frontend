import actionTypes from "../users/actionTypes";
import initialStates from "../users/initialStates";

const userReducer = (state = initialStates, { type, payload }) => {
    switch (type) {
        case actionTypes.USER_LOGIN_START:
            return {
                ...state,
                isLoading: true,
                errorMessage: undefined
            };
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                successfulLogin: true
            };
        case actionTypes.USER_LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                user: undefined,
                errorMessage: payload
            };
        case actionTypes.USER_CHECK_START:
            return {
                ...state,
                isChecking: true,
                errorMessage: undefined,
                registerSuccessful: false,
                successfulLogin: false
            };
        case actionTypes.USER_CHECK_SUCCESS:
            return {
                ...state,
                isChecking: false,
                user: payload,
                updateSuccessMessage: ""
            };
        case actionTypes.USER_CHECK_ERROR:
            return {
                ...state,
                isChecking: false,
                user:undefined,
                errorMessage: payload
            };
        case actionTypes.USER_LOGOUT_START:
            return {
                ...state,
                isLoggingOut: true
            };
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                user: undefined,
                successfulLogin: false,
                subscription: undefined
            };
        case actionTypes.USER_UPDATE_START: 
            return {
                ...state,
                isUpdating: true,
                updateErrorMessage: "",
                updateSuccessMessage:"",
            };
        case actionTypes.USER_UPDATE_SUCCESS: 
            return {
                ...state,
                isUpdating: false,
                updateErrorMessage: "",
                updateSuccessMessage: payload,
            };
        case actionTypes.USER_UPDATE_ERROR: 
            return {
                ...state,
                updateErrorMessage: payload,
                updateSuccessMessage:"",
            };
        case actionTypes.USER_REGISTER_START:
            return {
                ...state,
            }
        case actionTypes.USER_REGISTER_SUCCESS:
            return {
                ...state,
                registerSuccessful: true
            }
        case actionTypes.USER_REGISTER_ERROR:
            return {
                ...state,
                errorMessage: payload,
                registerSuccessful: false
            }
        case actionTypes.SHOPPING_CART_ADD: 
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, payload]
            }
        case actionTypes.SHOPPING_CART_REMOVE:
            return {
                ...state, 
                shoppingCart: [...state.shoppingCart.slice(0, payload), ...state.items.slice(payload + 1)]
            }
        default:
            return state
    }
};
export default userReducer;