import apiClient from "../helpers/apiClient";

class SubscriptionService {
    getSubscription = (userId) => apiClient().post('http://localhost:5220/api/subscription/get', userId, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    createSubscription = (data) => apiClient().post('http://localhost:5220/api/subscription/create', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    updateSubscription = (data) => apiClient().post('http://localhost:5220/api/subscription/update', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    deleteSubscription = (userId) => apiClient().delete('http://localhost:5220/api/subscription/delete', {
        headers: {
            'Content-Type': 'application/json',
        },
        data: userId,
        withCredentials: true
    })
}

export default new SubscriptionService()