import FirestoreService from "../../services/FirestoreService"
import Actions from './actions'

export const insertFirestoreAsync = (data) => (dispatch) => {
    dispatch(Actions.firestoreInsertStart());
    FirestoreService.insertFirestoreAsync(data)
        .then((response) => dispatch(Actions.firestoreInsertSuccess()))
        .catch((error) => dispatch(Actions.firestoreInsertError(error)))
}

