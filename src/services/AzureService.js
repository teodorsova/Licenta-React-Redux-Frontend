import apiClient from "../helpers/apiClient";

class AzureService {

    getConfigAsync = () => apiClient().get('http://localhost:5220/api/azure/get/config', {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    getPackageAsync = (fileName) => apiClient().post('http://localhost:5220/api/azure/get/package', fileName, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    uploadFileAsync = (file) => apiClient().post('http://localhost:5220/api/azure/post/upload', file, {
        headers: {
            'content-type': 'multipart/form-data',
        },
        withCredentials: true
    })
}

export default new AzureService();