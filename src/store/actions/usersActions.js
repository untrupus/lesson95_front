import {push} from "connected-react-router";
import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from "../actionTypes";
import axios from "../../axiosAPI";

const loginUserSuccess = user => {
    return {type: LOGIN_USER_SUCCESS, user};
};
const loginUserFailure = error => {
    return {type: LOGIN_USER_FAILURE, error};
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {"Authorization": token};

        await axios.delete("/users/sessions", {headers});
        dispatch({type: LOGOUT_USER});
        dispatch(push("/"));
    };
};

export const facebookLogin = data => {
    return async dispatch => {
        try {
            const response = await axios.post('/users/facebookLogin', data);
            console.log(response);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        } catch (e) {
            dispatch(loginUserFailure(e.response.data));
        }
    };
};