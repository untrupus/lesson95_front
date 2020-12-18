import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/actions/usersActions";

const useStyles = makeStyles(() => ({
    menu: {
        color: "white",
        fontWeight: "bold",
    },
    username: {
        marginRight: '15px'
    },
    avatar: {
        width: '40px',
        height: "40px",
        borderRadius: "50%",
        position: "absolute",
        right: '10px',
    }
}));


const UserMenu = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useSelector(state => state.users.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        dispatch(logoutUser());
    };

    let icon;
    if (props.fbImage) {
        icon = <img src={props.fbImage}
                    alt="avatar"
                    className={classes.avatar}
        />
    } else {
        icon = <img src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                    alt="avatar"
                    className={classes.avatar}
        />
    }

    return (
        <div>
            <Button aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    className={classes.menu}
            >
                <span className={classes.username}>Hello, {props.name} &#160;</span>

            </Button>
            {icon}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {user && user.user.role === "user" ?
                    <div>
                    <MenuItem onClick={handleClose}>
                        <Link component={RouterLink} className={classes.history} to={"/cocktails/" + user.user._id}>My  Cocktails</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link component={RouterLink} className={classes.history} to="/addcocktail">Add Cocktail</Link>
                    </MenuItem> </div> : null}
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
