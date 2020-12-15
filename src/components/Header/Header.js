import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import {useSelector} from "react-redux";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import UserMenu from "../Menu/Menu";


const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between"
    },

    logo: {
        color: "white",
        fontWeight: "bold",
        '&:hover': {
            textDecoration: "none"
        }
    }
}));

const Header = () => {
    const classes = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar className={classes.header}>
                    <Typography variant="h6" className={classes.title}>
                        <Link component={RouterLink} className={classes.logo} to="/">Cocktails</Link>
                    </Typography>
                    {!user ?
                        <FacebookLogin/> :
                        <UserMenu
                            name={user.user.displayName}
                            image={user.user.avatarImage}
                            fbImage={user.user.fbAvatar}
                        />
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;