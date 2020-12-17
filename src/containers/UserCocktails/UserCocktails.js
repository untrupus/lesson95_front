import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import {useSelector, useDispatch} from "react-redux";
import {fetchUserCocktail} from "../../store/actions/cocktailsActions";
import {makeStyles} from '@material-ui/core/styles';
import SingleCocktail from "../../components/SingleCocktail/SingleCocktail";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

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

const UserCocktails = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.userCocktails);

    useEffect(() => {
        dispatch(fetchUserCocktail(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const cocktailsList = cocktails.map(cocktail => {
        const ingredientsList = cocktail.ingredients.map((ingr, index) => {
            return (
                <div key={index}>
                    <ArrowRightIcon/> {ingr.ingName}: {ingr.amount}
                </div>
            )
        });
        let name;
        if (cocktail.published) {
            name = cocktail.name;
        } else {
            name = cocktail.name + ' (not published)';
        }

        return (
            <SingleCocktail
                key={cocktail._id}
                name={name}
                image={cocktail.image ?
                    'http://localhost:8000/uploads/' + cocktail.image
                    : 'https://argamak-sher.uz/wp-content/uploads/no-image.png'}
                recipe={cocktail.recipe}
                ingredients={ingredientsList}
            />
        )
    });

    return (
        <Container className={classes.container}>
            {cocktailsList}
        </Container>
    );
};

export default UserCocktails;