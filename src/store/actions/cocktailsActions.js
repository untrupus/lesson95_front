import {
    ADD_COCKTAIL_ERROR,
    FETCH_COCKTAILS_ERROR,
    FETCH_COCKTAILS_SUCCESS,

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