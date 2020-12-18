import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {rateCocktail} from '../../store/actions/cocktailsActions';
import {useDispatch} from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
        margin: '10px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    rating: {
        margin: '0'
    },
    rate: {
        marginTop: '20px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    form: {
        display: 'flex',
        alignItems: 'center'
    },
    thumb: {
        cursor: 'pointer',
        '&:hover': {
            color: "green"
        }
    }
}));


const SingleCocktail = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [stars, setStars] = useState('')
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleChange = (event) => {
        setStars(event.target.value);
    };

    const addStar = star => {
        if (stars !== '') {
            dispatch(rateCocktail(props.id, star));
            setStars('');
        }
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <div>
                        {props.remove}
                        {props.add}
                    </div>
                }
                title={props.name}
                className={classes.title}
            />
            <CardMedia
                className={classes.media}
                image={props.image}
            />

            <CardActions disableSpacing>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={props.rating} readOnly/>
                </Box>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph variant="h5">Recipe:</Typography>
                    <Typography paragraph>
                        {props.recipe}
                    </Typography>
                    <Typography paragraph variant="h5">
                        Ingredients:
                    </Typography>
                    {props.ingredients}
                    <Typography paragraph variant="h5" className={classes.rate}>Rate this cocktail:</Typography>
                    <div className={classes.form}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Rate</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={stars}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                        <ThumbUpIcon
                            className={classes.thumb}
                            onClick={() => addStar(stars)}
                        />
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default SingleCocktail;