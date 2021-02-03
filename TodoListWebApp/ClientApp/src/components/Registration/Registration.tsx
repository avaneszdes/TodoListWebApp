import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch} from 'react-redux'
import {REGISTRATION} from "../../redux/constants";
import SignIn from "../Autorization/SignIn";
import ToDoList from "../TodoList/ToDoList";
import {Route} from "react-router-dom";
import {Formik, useFormik} from 'formik';
import * as yup from "yup";
import {ref} from "yup";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

interface SignForm {
    firstName: string
    lastName: string
    password: string
    confirmPassword: string,
    email: string
}

interface Props {
    pressButton: (isPressed: boolean) => void,
    isPres: boolean
}

const useStyles = makeStyles((theme: any) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const vScheme = yup.object().shape({
    firstName: yup.string().typeError('must be a string').required('required'),
    lastName: yup.string().typeError('must be a string').required('required'),
    password: yup.string().min(8, 'length must be most than 7').required('required'),
    email: yup.string().email('incorrect email address').required('required'),
    confirmPassword: yup.string().oneOf([ref('password')], 'passwords don`t match').required('required'),
})

export default function SignUp({isPres, pressButton}: Props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [isPressed, setPressed] = useState(false)

    const initialValues: SignForm = {
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            email: '',
        },
        validationSchema: vScheme,
        onSubmit: (values) => {
            dispatch({type: REGISTRATION, payload: values})
            setPressed(!isPres)
            pressButton(isPressed)
        },
    })


    if (!isPressed) {
        return (

            <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    value={formik.values.firstName}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    value={formik.values.lastName}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    value={formik.values.email}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    value={formik.values.password}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="confirmPassword"
                                    id="confirmPassword"
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    value={formik.values.confirmPassword}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/todo-list" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                                <Route path="/todo-list">
                                    <ToDoList/>
                                </Route>
                            </Grid>
                        </Grid>
                    </form>

                </div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
        )
    }

    return <SignIn/>
}