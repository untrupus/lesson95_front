import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Container from "@material-ui/core/Container";
import {fetchCocktails} from "../../store/actions/cocktailsActions";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {deleteCocktail, publicCocktail} from "../../store/actions/adminActions";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SingleCocktail from "../../components/SingleCocktail/SingleCocktail";
import {makeStyles} from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    iconDel: {
        cursor: "pointer",
        '&:hover': {
            color: "red"
        }
    },
    iconAdd: {
        cursor: "pointer",
        '&:hover': {
            color: "green"
        }
    },
}));

const Cocktails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.cocktails);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchCocktails());
    }, [dispatch]);

    const remove = async (id) => {
        await dispatch(deleteCocktail(id));
        dispatch(fetchCocktails());
    };

    const add = async (id) => {
        await dispatch(publicCocktail(id));
        dispatch(fetchCocktails());
    };

    const cocktailsList = cocktails.map(cocktail => {
        const ingredientsList = cocktail.ingredients.map((ingr, index) => {
            return (
                <div key={index} >
                    <ArrowRightIcon/> {ingr.ingName}: {ingr.amount}
                </div>
            )
        });

        let rating = 0;
        if (cocktail.rating.length !== 0) {
            let sum = 0;
            for(let i = 0; i < cocktail.rating.length; i++){
                sum += cocktail.rating[i].rating;
            }
            rating = sum / cocktail.rating.length;
        }

        if (cocktail.published || (user && user.user.role === "admin")) {
            return (
                <SingleCocktail
                    key={cocktail._id}
                    id={cocktail._id}
                    page={true}
                    rating={rating}
                    name={cocktail.name}
                    image={cocktail.image ?
                        'http://localhost:8000/uploads/' + cocktail.image
                        : 'https://argamak-sher.uz/wp-content/uploads/no-image.png'}
                    recipe={cocktail.recipe}
                    ingredients={ingredientsList}
                    remove={user && user.user.role === "admin" ?
                        <HighlightOffIcon
                            onClick={() => remove(cocktail._id)}
                            className={classes.iconDel}
                        /> : null}
                    add={!cocktail.published && (user && user.user.role === "admin") ?
                        <AddCircleOutlineIcon
                            onClick={() => add(cocktail._id)}
                            className={classes.iconAdd}
                        /> : null}
                />
            )
        } else return null
    });

    return (
        <Container className={classes.container}>
            {cocktailsList}
        </Container>
    );
};

export default Cocktails;