import React, {useState, useRef} from 'react';
import {useDispatch} from "react-redux";
import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {addCocktail} from "../../store/actions/cocktailsActions";
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        display: 'block'
    },
    ingr: {
        width: '45%',
        marginRight: '20px'
    },
    alert: {
        marginTop: theme.spacing(1),
        width: "100%"
    },
    newIngr: {
        display: 'flex',
        alignItems: 'center'
    },
    remove: {
        cursor: "pointer",
        '&:hover': {
            color: "red"
        }
    }
}));
const AddCocktail = () => {
    const classes = useStyles();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: '',
        image: '',
        recipe: '',
        ingredients: [{
            ingName: '',
            amount: ''
        }]
    });

    const inputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const inputIngredientHandler = i => e => {
        const name = e.target.name;
        const value = e.target.value;
        let newIngredients = state.ingredients;
        newIngredients[i] = {...newIngredients[i], [name]: value}
        setState(prevState => {
            return {...prevState, ingredients: newIngredients};
        });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            if (Array.isArray(state[key])) {
                formData.append(key, JSON.stringify(state[key]));
            } else {
                formData.append(key, state[key]);
            }
        });
        dispatch(addCocktail(formData));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState => ({
            ...prevState, [name]: file
        }));
    };

    const addIngredient = () => {
        const ingredientsCopy = state.ingredients.concat([{
            ingName: '',
            amount: ''
        }]);
        setState(prevState => {
            return {...prevState, ingredients: [...ingredientsCopy]};
        });
    };

    const remove = (index) => {
        let ingredientsCopy = [...state.ingredients];
        ingredientsCopy.splice(index, 1);
        setState(prevState => {
            return {...prevState, ingredients: [...ingredientsCopy]};
        });
    };

    let ingredients = state.ingredients.map((ingredient, index) => {
        return (
            <div className={classes.newIngr} key={index}>
                <TextField
                    className={classes.ingr}
                    variant="outlined"
                    margin="normal"
                    required
                    id="ingName"
                    label="Ingredient Name"
                    name="ingName"
                    value={state.ingredients[index].ingName}
                    onChange={inputIngredientHandler(index)}
                    autoComplete="ingName"
                    autoFocus
                />
                <TextField
                    className={classes.ingr}
                    variant="outlined"
                    margin="normal"
                    id="amount"
                    required
                    label="Amount"
                    name="amount"
                    value={state.ingredients[index].amount}
                    onChange={inputIngredientHandler(index)}
                    autoComplete="amount"
                    autoFocus
                />
                {index !== 0 ? <HighlightOffIcon
                    className={classes.remove}
                    onClick={() => remove(index)}
                /> : null}
            </div>
        )
    });

    return (
        <Container>
            <h2>Add new cocktail</h2>
            <form className={classes.form}
                  onSubmit={formSubmit}
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={state.name}
                    onChange={inputChangeHandler}
                    autoComplete="name"
                    autoFocus
                />

                {ingredients}

                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={addIngredient}
                >
                    Add Ingredient
                </Button>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    rows={3}
                    name="recipe"
                    label="Recipe"
                    type="recipe"
                    id="recipe"
                    value={state.recipe}
                    onChange={inputChangeHandler}
                    autoComplete="recipe"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="image"
                    type="file"
                    placeholder="image"
                    // error={!!getFieldError("image")}
                    // helperText={getFieldError("image")}
                    ref={inputRef}
                    id="image"
                    onChange={fileChangeHandler}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Create Cocktail
                </Button>
            </form>
        </Container>
    );
};

export default AddCocktail;