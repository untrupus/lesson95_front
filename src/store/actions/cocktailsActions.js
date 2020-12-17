import {
    ADD_COCKTAIL_ERROR
} from "../actionTypes";
import axiosAPI from "../../axiosAPI";
import {push} from "connected-react-router";

const addCocktailError = error => {
    return {type: ADD_COCKTAIL_ERROR, error};
};

export const addCocktail = (data) => {
    return async (dispatch) => {
        try {
            // let cocktail = JSON.stringify(data);
            await axiosAPI.post('/cocktails', data);
            dispatch(addCocktailError(null));
            dispatch(push("/"));
        } catch (e) {
            dispatch(addCocktailError(e.response.data));
        }
    };
};