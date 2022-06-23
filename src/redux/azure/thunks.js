import AzureService from "../../services/AzureService"
import Actions from './actions'

export const getConfigAsync = () => (dispatch) => {
    dispatch(Actions.configLoadStart());
    AzureService.getConfigAsync()
        .then((response) => dispatch(Actions.configLoadSuccess(response.data)))
        .catch((error) => dispatch(Actions.configLoadError(error)))
}

export const uploadFileAsync = (file) => (dispatch) => {
    AzureService.uploadFileAsync(file).then((response) => console.log(response));
}