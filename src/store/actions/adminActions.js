import {
    DELETE_COCKTAIL_ERROR,
    PUBLIC_COCKTAIL_ERROR
} from "../actionTypes";
import axiosAPI from "../../axiosAPI";

const deleteCocktailError = error => {
    return {type: DELETE_COCKTAIL_ERROR, error};
};

const publicCocktailError = error => {
    return {type: PUBLIC_COCKTAIL_ERROR, error};
};

export const deleteCocktail = (id) => {
    return async (dispatch) => {
        try {
            await axiosAPI.delete('/cocktails/' + id);
        } catch (e) {
            dispatch(deleteCocktailError(e));
        }
    };
};

export const publicCocktail = (id) => {
    return async (dispatch) => {
        try {
            await axiosAPI.patch('/cocktails/' + id, {published: true});
        } catch (e) {
            dispatch(publicCocktailError(e));
        }
    };
};