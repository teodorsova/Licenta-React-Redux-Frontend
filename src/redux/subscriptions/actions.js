import subscriptionActionTypes from './actionTypes'

const subscriptionLoadStart = (userId) => ({
    type: subscriptionActionTypes.SUBSCRIPTION_LOAD_START,
})

const subscriptionLoadSuccess = (subscription) => ({
    type: subscriptionActionTypes.SUBSCRIPTION_LOAD_SUCCESS,
    successfulCreation: false,
    payload: subscription
})

const subscriptionLoadError = (errorMessage) => ({
    type: subscriptionActionTypes.SUBSCRIPTION_LOAD_ERROR,
    payload: errorMessage
})

const subscriptionCreateStart = () => ({
    type: subscriptionActionTypes.SUBSCRIPTION_CREATE_START,
    successfulCreation: false,
})

const subscriptionCreateSuccess = () => ({
    type: subscriptionActionTypes.SUBSCRIPTION_CREATE_SUCCESS,
    successfulCreation: true,

})

const subscriptionCreateError = (errorMessage) => ({
    type: subscriptionActionTypes.SUBSCRIPTION_CREATE_ERROR,
    successfulCreation: false,
    payload: errorMessage,
})

const subscriptionDeleteStart = () => ({
    type: subscriptionActionTypes.SUBSCRIPTION_DELETE_START,

})
const subscriptionDeleteSuccess = (data) => ({
    type: subscriptionActionTypes.SUBSCRIPTION_DELETE_SUCCESS,
    payload: data

})
const subscriptionDeleteError = (errorMessage) => ({
    type: subscriptionActionTypes.SUBSCRIPTION_DELETE_ERROR,
    payload: errorMessage

})


export default {
    subscriptionLoadStart,
    subscriptionLoadSuccess,
    subscriptionLoadError,
    subscriptionCreateStart,
    subscriptionCreateSuccess,
    subscriptionCreateError,
    subscriptionDeleteStart,
    subscriptionDeleteSuccess,
    subscriptionDeleteError
}