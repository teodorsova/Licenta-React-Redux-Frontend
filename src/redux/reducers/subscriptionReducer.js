import actionTypes from "../subscriptions/actionTypes";
import initialStates from "../subscriptions/initialStates";

const subscriptionReducer = (state = initialStates, {type, payload}) => {
    switch(type) {
        case actionTypes.SUBSCRIPTION_LOAD_START:
            return {
                ...state,
                isLoading: true,
                subscription: undefined,
            }
        case actionTypes.SUBSCRIPTION_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                subscription: payload,
            }
        case actionTypes.SUBSCRIPTION_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                subscription: undefined,
                errorMessage: payload
            }
        case actionTypes.SUBSCRIPTION_CREATE_START:
            return {
                ...state,
                successfulCreation: false,
                subscription: undefined
            }
        case actionTypes.SUBSCRIPTION_CREATE_SUCCESS:
            return {
                ...state,
                successfulCreation: true,
                subscription: payload
            }
        case actionTypes.SUBSCRIPTION_CREATE_ERROR:
            return {
                ...state,
                successfulCreation: false,
                errorMessage: payload
            }
        case actionTypes.SUBSCRIPTION_DELETE_START:
            return {
                ...state,
                successfulDeletion: false,
            }
        case actionTypes.SUBSCRIPTION_DELETE_SUCCESS:
            return {
                ...state,
                subscription: undefined,
                successfulDeletion: true
            }
        case actionTypes.SUBSCRIPTION_DELETE_ERROR:
            return {
                ...state,
                errorMessage: payload
            }
        default: return state
    }   

}

export default subscriptionReducer;