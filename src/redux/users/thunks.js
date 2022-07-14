import UsersService from "../../services/UsersService";
import actions from "./actions";

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

export const loginAsync = data => (dispatch) => {
    dispatch(actions.userLoginStart())
    
    UsersService.loginUser(data)
        .then((response) => {
            dispatch(actions.userLoginSuccess());
        }).catch(async function(error) {
            dispatch(actions.userLoginError(error.message))
            await sleep(2000);
            dispatch(actions.userLoginStart())
        })

        

};

export const getUserAsync = () => dispatch => {
    dispatch(actions.userCheckStart())

    UsersService.getUser()
        .then((response) => {
            dispatch(actions.userCheckSuccess(response.data));
        }).catch((error) => dispatch(actions.userCheckError(error.message)))
}

export const logOut = () => dispatch => {
    dispatch(actions.userLogoutStart());
    UsersService.logoutUser()
        .then((response) => {
            dispatch(actions.userLogoutSuccess(response))
        }).catch((error) => { console.log(error) })
}

export const updateUser = data => (dispatch) => {
    dispatch(actions.userUpdateStart())

    UsersService.updateUser(data)
        .then((response) => dispatch(actions.userUpdateSuccess(response.data)))
            .catch((error) => { 
                dispatch(actions.userUpdateError(error))
            })
}

export const registerUserAsync = data => (dispatch) => {
    dispatch(actions.userRegisterStart())

    UsersService.registerUser(data)
        .then((response) => dispatch(actions.userRegisterSuccess()))
        .catch((error) => {
            dispatch(actions.userRegisterError(error))
        })
}

export const addToCart = data => (dispatch) => {
    dispatch(actions.shoppingCartAdd(data));
}

export const removeFromCart = data => (dispatch) => {
    dispatch(actions.shoppingCartRemove(data));
}


