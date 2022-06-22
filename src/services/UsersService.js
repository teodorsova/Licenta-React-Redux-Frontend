import apiClient from "../helpers/apiClient";

class UserService {

    loginUser = (data) => apiClient().post('http://localhost:5220/api/login', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    getUser = () => apiClient().get('http://localhost:5220/api/user', {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    logoutUser = () => apiClient().post('http://localhost:5220/api/logout', {}, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    updateUser = (data) => apiClient().post('http://localhost:5220/api/update', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });

    registerUser = (data) => apiClient().post('http://localhost:5220/api/register', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });


}

export default new UserService()