import azureActionTypes from './actionTypes'

const configLoadStart = () => ({
    type: azureActionTypes.CONFIG_LOAD_START
})

const configLoadSuccess = (data) => ({
    type: azureActionTypes.CONFIG_LOAD_SUCCESS,
    payload: data
})

const configLoadError = (error) => ({
    type: azureActionTypes.CONFIG_LOAD_ERROR,
    errorMessage: error
})

export default {
    configLoadStart,
    configLoadSuccess,
    configLoadError,
}