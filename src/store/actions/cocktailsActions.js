import {
    ADD_COCKTAIL_ERROR,
    FETCH_COCKTAILS_ERROR,
    FETCH_COCKTAILS_SUCCESS,
    FETCH_USER_COCKTAILS_ERROR,
    FETCH_USER_COCKTAILS_SUCCESS,
    RATE_COCKTAIL_ERROR
} from "../actionTypes";
import axiosAPI from "../../axiosAPI";
import {push} from "connected-react-router";

const addCocktailError = error => {
    return {type: ADD_COCKTAIL_ERROR, error};
};

export const addCocktail = (data) => {
    return async (dispatch) => {
        try {
            await axiosAPI.post('/cocktails', data);
            dispatch(addCocktailError(null));
            dispatch(push("/"));
        } catch (e) {
            dispatch(addCocktailError(e.response.data));
        }
    };
};

const fetchCocktailsError = error => {
    return {type: FETCH_COCKTAILS_ERROR, error};
};

const fetchCocktailsSuccess = value => {
    return {type: FETCH_COCKTAILS_SUCCESS, value};
};

export const fetchCocktails = () => {
    return async dispatch => {
        try {
            const response = await axiosAPI.get("cocktails");
            dispatch(fetchCocktailsSuccess(response.data));
        } catch (e) {
            dispatch(fetchCocktailsError(e));
        }
    };
};

const fetchUserCocktailsSuccess = value => {
    return {type: FETCH_USER_COCKTAILS_SUCCESS, value};
};

const fetchUserCocktailsError = error => {
    return {type: FETCH_USER_COCKTAILS_ERROR, error};
};

export const fetchUserCocktail = id => {
    return async dispatch => {
        try {
            const response = await axiosAPI.get("cocktails?user=" + id);
            dispatch(fetchUserCocktailsSuccess(response.data));
        } catch (e) {
            dispatch(fetchUserCocktailsError(e))
        }
    };
};

const rateCocktailError = error => {
    return {type: RATE_COCKTAIL_ERROR, error};
};

export const rateCocktail = (id, stars) => {
    return async (dispatch) => {
        try {
            await axiosAPI.put('/cocktails/' + id, {rating: stars});
        } catch (e) {
            dispatch(rateCocktailError(e));
        }
    };
};