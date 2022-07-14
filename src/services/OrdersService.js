import apiClient from "../helpers/apiClient";

class OrdersService {

    createOrder = (data) => apiClient().post('http://localhost:5220/order/create/order', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    createFurnitureAsync = (data) => apiClient().post('http://localhost:5220/order/create/furniture', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    createFurnitureOrderAsync = (data) => apiClient().post('http://localhost:5220/order/create/furnitureOrder', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    getAllOrders = (UserId) => apiClient().post('http://localhost:5220/order/post/orders', UserId, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    getFurnituresForOrder = (data) => apiClient().post('http://localhost:5220/order/post/furnitures', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    getFurnituresForCompanyAccount = (userId) => apiClient().get('http://localhost:5220/order/furnitures/account?userId=' + userId, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    updateFurnitureStatus = (id, status) => apiClient().post('http://localhost:5220/order/furnitures/update/status?id=' + id +"&status=" + status, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
    
}

export default new OrdersService();