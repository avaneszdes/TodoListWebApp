import React from 'react';
import ErrorAlertComponent from "../ErrorAlert/ErrorAlert";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {CHANGE_USER_PASSWORD} from "../../redux/constants";
import {ref} from "yup";
import {UpdatePassword} from "../Interfaces";

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
    confirmPassword: yup.string().oneOf([ref('password')], 'passwords don`t match').required('required'),
})

export default function EmailConfirmation() {

    const classes = useStyles();
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            email: '',
        },
        validationSchema: vScheme,
        onSubmit: (values) => {
            console.log(window.location.href)
            const confirmationForm: UpdatePassword = {EmailAddress: values.email, Password: values.password, GuidId: window.location.href.substring(44,window.location.href.length)}
            dispatch({type: CHANGE_USER_PASSWORD, payload: confirmationForm})
        },
    })
   
   
    return (
        <Container component="main" maxWidth="xs">
            <ErrorAlertComponent/>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Change Password
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
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        value={formik.values.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        value={formik.values.confirmPassword}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    <Button
                        id={"signIn"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Update Password
                    </Button>
                </form>
            </div>
        </Container>
    );
}