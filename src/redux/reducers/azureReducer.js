import actionTypes from "../azure/actionTypes";
import initialStates from "../azure/initialStates"

const azureReducer = (state = initialStates, { type, payload }) => {
    switch (type) {
        case actionTypes.CONFIG_LOAD_START:
            return {
                ...state,
                successfulLoad: false,
                config: ""
            }

        case actionTypes.CONFIG_LOAD_SUCCESS:
            return {
                ...state,
                successfulLoad: true,
                config: payload
            }

        case actionTypes.CONFIG_LOAD_ERROR:
            return {
                ...state,
                successfulLoad: false,
                config: "",
                errorMessage: payload
            }

        case actionTypes.FILE_UPLOAD_START:
            return {
                ...state,
                successfulUpload: false
            }
        case actionTypes.FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                successfulUpload: true
            }

        case actionTypes.FILE_UPLOAD_ERROR:
            return {
                ...state,
                successfulUpload: false,
                errorMessage: payload
            }

        default: return state
    }

}

export default azureReducer;