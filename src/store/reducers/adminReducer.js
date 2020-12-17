import {
    PUBLIC_COCKTAIL_ERROR,
    DELETE_COCKTAIL_ERROR
} from "../actionTypes";

const initialState = {
    deleteCocktailError: null,
    publicCocktailError: null
};

const adminReducer = (state = initialState, action) => {
    switch(action.type) {
        case PUBLIC_COCKTAIL_ERROR:
            return {...state, publicCocktailError: action.error};
        case DELETE_COCKTAIL_ERROR:
            return {...state, deleteCocktailError: action.error};
        default:
            return state;
    }
};

export default adminReducer;