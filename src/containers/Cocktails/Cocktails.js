import React from 'react';
import Container from "@material-ui/core/Container";
import SingleCocktail from "../../components/SingleCocktail/SingleCocktail";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   container: {
       paddingTop: '20px',
       display: 'flex',
       flexWrap: 'wrap',
       justifyContent: 'space-between'
   }
}));

const Cocktails = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <SingleCocktail/>
            <SingleCocktail/>
            <SingleCocktail/>
        </Container>
    );
};

export default Cocktails;