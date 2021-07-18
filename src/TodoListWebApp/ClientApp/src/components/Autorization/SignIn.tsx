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
import {useDispatch, useSelector} from "react-redux";
import {AUTHORIZATION, SEND_USER_PASSWORD} from "../../redux/constants";
import {useFormik} from "formik";
import * as yup from "yup";
import SimpleBackdrop from "../BackDrop/BackDrop";
import {IRootState} from "../../redux/configureStore";
import {Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import ErrorAlertComponent from "../ErrorAlert/ErrorAlert";

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

const useStyles = makeStyles((theme) => ({
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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const vScheme = yup.object().shape({
    password: yup.string().min(8, 'length must be most than 7').required('required'),
    email: yup.string().email('incorrect email address').required('required'),
})
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const loading: boolean = useSelector((state: IRootState) => state.todos.loading)
    const [inputEditHideBtn, setInputEditHideBtn] = useState(false)
    const [value, setValue] = useState('')
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
            dispatch({type: AUTHORIZATION, payload: values})
        },
    })

    const getPasswordAndEmail = (email: string) => {
        dispatch({type: SEND_USER_PASSWORD, payload: email})
        setInputEditHideBtn(!inputEditHideBtn);
    }

    const handleClose = () => {
        setInputEditHideBtn(!inputEditHideBtn);
    }

    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    return (
        <Container component="main" maxWidth="xs">
            <ErrorAlertComponent/>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        value={formik.values.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    <Button
                        id={"signIn"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" onClick={handleClose} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signUp" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                
                <Dialog TransitionComponent={Transition}
                        keepMounted
                        open={inputEditHideBtn}
                        onClose={handleClose}
                        aria-labelledby="form-title"
                >
                    <DialogTitle id="form-title">Sending your password to email</DialogTitle>
                    <DialogContent>
                        <TextField
                            placeholder="Write your email"
                            label="Email address"
                            style={{width: '400px'}}
                            onChange={textChanged}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color='primary'
                            onClick={() => getPasswordAndEmail(value)}
                        >
                            Send password
                        </Button>
                        <Button
                            onClick={handleClose}
                            color='primary'
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <SimpleBackdrop hidden={loading}/>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>

    )
}
