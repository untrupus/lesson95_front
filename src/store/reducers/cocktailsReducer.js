import {
    ADD_COCKTAIL_ERROR,
    FETCH_COCKTAILS_SUCCESS,
    FETCH_COCKTAILS_ERROR,

} from "../actionTypes";

const initialState = {
    addCocktailError: null,
    cocktails: [],
    fetchCocktailsError: null,

};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COCKTAIL_ERROR:
            return {...state, addCocktailError: action.error};
        case FETCH_COCKTAILS_SUCCESS:
            return {...state, cocktails: action.value};
        case FETCH_COCKTAILS_ERROR:
            return {...state, fetchCocktailsError: action.error};
        default:
            return state;
    }
};

export default cocktailsReducer;