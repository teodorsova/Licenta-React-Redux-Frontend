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

const fileUploadStart = () => ({
    type: azureActionTypes.FILE_UPLOAD_START
})

const fileUploadSuccess = () => ({
    type: azureActionTypes.FILE_UPLOAD_SUCCESS,
})

const fileUploadError = (error) => ({
    type: azureActionTypes.FILE_UPLOAD_ERROR,
    errorMessage: error
})

export default {
    configLoadStart,
    configLoadSuccess,
    configLoadError,
    fileUploadStart,
    fileUploadSuccess,
    fileUploadError
}