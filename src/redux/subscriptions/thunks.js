import SubscriptionService from '../../services/SubscriptionServices'
import actions from '../subscriptions/actions'

export const getSubscriptionAsync = userId => (dispatch) => {
    dispatch(actions.subscriptionLoadStart())

    SubscriptionService.getSubscription(userId)
        .then((response) => {
            dispatch(actions.subscriptionLoadSuccess(response.data))
        }).catch((error) => dispatch(actions.subscriptionLoadError(error)))
}

export const createSubscriptionAsync = data => (dispatch) => {
    dispatch(actions.subscriptionCreateStart())
    
    SubscriptionService.createSubscription(data)
        .then((response) => {
            dispatch(actions.subscriptionCreateSuccess(response.data))
        }).catch((error) => dispatch(actions.subscriptionCreateError(error)))
}

export const deleteSubscriptionAsync = userId => (dispatch) => {
    dispatch(actions.subscriptionDeleteStart())

    SubscriptionService.deleteSubscription(userId)
        .then((response) => dispatch(actions.subscriptionDeleteSuccess(response.data)))
        .catch((error) => dispatch(actions.subscriptionDeleteError(error)))
}

