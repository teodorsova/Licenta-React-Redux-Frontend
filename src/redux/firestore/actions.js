import firestoreActionTypes from './actionTypes'

const firestoreInsertStart = () => ({
    type: firestoreActionTypes.FIRESTORE_INSERT_START
})

const firestoreInsertSuccess = () => ({
    type: firestoreActionTypes.FIRESTORE_INSERT_SUCCESS,
})

const firestoreInsertError = (error) => ({
    type: firestoreActionTypes.FIRESTORE_INSERT_ERROR,
    errorMessage: error
})

const firestoreSelectStart = () => ({
    type: firestoreActionTypes.FIRESTORE_SELECT_START
})

const firestoreSelectSuccess = (data) => ({
    type: firestoreActionTypes.FIRESTORE_SELECT_SUCCESS,
    payload:data
})

const firestoreSelectError = (error) => ({
    type: firestoreActionTypes.FIRESTORE_SELECT_ERROR,
    errorMessage: error
})


export default {
    firestoreInsertStart,
    firestoreInsertSuccess,
    firestoreInsertError,
    firestoreSelectStart,
    firestoreSelectSuccess,
    firestoreSelectError
}