import {
    ADD_COCKTAIL_ERROR,
    FETCH_COCKTAILS_SUCCESS,
    FETCH_COCKTAILS_ERROR,
    FETCH_USER_COCKTAILS_ERROR,
    FETCH_USER_COCKTAILS_SUCCESS,
    RATE_COCKTAIL_ERROR
} from "../actionTypes";

const initialState = {
    addCocktailError: null,
    cocktails: [],
    userCocktails: [],
    fetchCocktailsError: null,
    fetchUserCocktailError: null,
    rateCocktailError: null
};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COCKTAIL_ERROR:
            return {...state, addCocktailError: action.error};
        case FETCH_COCKTAILS_SUCCESS:
            return {...state, cocktails: action.value};
        case FETCH_COCKTAILS_ERROR:
            return {...state, fetchCocktailsError: action.error};
        case FETCH_USER_COCKTAILS_SUCCESS:
            return {...state, userCocktails: action.value};
        case FETCH_USER_COCKTAILS_ERROR:
            return {...state, fetchUserCocktailError: action.value};
        case RATE_COCKTAIL_ERROR:
            return {...state, rateCocktailError: action.error};
        default:
            return state;
    }
};

export default cocktailsReducer;