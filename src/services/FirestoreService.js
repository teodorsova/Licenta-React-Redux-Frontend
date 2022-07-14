import apiClient from "../helpers/apiClient";

class FirestoreService {

    insertFirestoreAsync = (data) => apiClient().post('http://localhost:5220/services/add/furniture', data, {
        headers: {
            'content-type': 'application/json',
        },
        withCredentials: true
    })
}

export default new FirestoreService();