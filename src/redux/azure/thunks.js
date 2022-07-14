import AzureService from "../../services/AzureService"
import Actions from './actions'

export const getConfigAsync = () => (dispatch) => {
    dispatch(Actions.configLoadStart());
    AzureService.getConfigAsync()
        .then((response) => dispatch(Actions.configLoadSuccess(response.data)))
        .catch((error) => dispatch(Actions.configLoadError(error)))
}

export const uploadFileAsync = (files) => (dispatch) => {
        var fileCount = 0;
        console.log(typeof(files))
        console.log(files)
        dispatch(Actions.fileUploadStart())
        for(const file of files) {
            let formData = new FormData()
            formData.append('body', file)
            AzureService.uploadFileAsync(formData)
                .then((response) => {
                    console.log(response)
                    fileCount = fileCount + 1;
                    if(fileCount === files.length) {
                        dispatch(Actions.fileUploadSuccess());
                    }
                })
                .catch((error) => {
                    dispatch(Actions.fileUploadError(error));
                })
        }
}