import {
    ADD_COCKTAIL_ERROR,

} from "../actionTypes";

const initialState = {
    addCocktailError: null
};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COCKTAIL_ERROR:
            return {...state, addCocktailError: action.error};
        default:
            return state;
    }
};

export default cocktailsReducer;