import actionTypes from "../firestore/actionTypes";
import initialStates from "../firestore/initialStates"

const firestoreReducer = (state = initialStates, { type, payload }) => {
    switch (type) {
        case actionTypes.FIRESTORE_INSERT_START:
            return {
                ...state,
                successfulInsert: false,
            }
        case actionTypes.FIRESTORE_INSERT_SUCCESS:
            return {
                ...state,
                successfulInsert: true,
            }
        case actionTypes.FIRESTORE_INSERT_ERROR:
            return {
                ...state,
                successfulInsert: false,
                errorMessage: payload
            }

        default: return state
    }

}

export default firestoreReducer;