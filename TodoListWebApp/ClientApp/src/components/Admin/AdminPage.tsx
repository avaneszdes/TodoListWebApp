import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {DELETE_USER, EDIT_USER, GET_USERS} from "../../redux/constants"
import {IRootState} from "../../redux/configureStore";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    TextField
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {User} from "../Interfaces";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 1800,

        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        button: {
            margin: theme.spacing(1),
        },
        item: {
            width: '200px',
            borderWidth: '1px',
            borderColor: 'green',
            borderStyle: 'solid',
            paddingLeft: '20px',
            paddingTop: '14px',
            borderRadius: '10px!important',
            marginLeft: '10px',
        },
        headerItem: {
            width: '218px',
            height: '30px',
            borderWidth: '2px',
            borderTop: 'white',
            borderBottom: 'white',
            borderStyle: 'solid',
            paddingTop: '5px',
            marginLeft: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }),
);


const yup = require('yup')
require('yup-password')(yup)

const vScheme = yup.object().shape({
    firstName: yup.string().min(2, 'must be most than 2 symbols').max(30, 'must be lest than 30 symbols').required('required'),
    lastName: yup.string().min(2, 'must be most than 2 symbols').max(30, 'must be lest than 30 symbols').required('required'),
    password: yup.string().password()
        .minSymbols(1, 'password must contain at least 1 symbol')
        .minUppercase(3, 'password must contain at least 3 uppercase letters')
        .minLowercase(3, 'password must contain at least 3 lowercase letters')
        .min(8, 'length must be most than 7')
        .max(30, 'length must be less than 30')
        .required('required'),
    email: yup.string().email('incorrect email address').required('required'),
    role: yup.string().required('required'),
})

export default function AdminPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [userId, setUserId] = useState(0 )
    const users = useSelector((x: IRootState) => x.admin)

    useEffect(() => {
        dispatch({type: GET_USERS, payload: []})
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = () => {
        setOpen(!open)
    }
    const formik = useFormik({
        initialValues: {
            id: 0,
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            role: '',
        },
        validationSchema: vScheme,
        onSubmit: (values) => {
            const user = {...values, id: userId}
            handleClose()
            dispatch({type: EDIT_USER, payload: user})
        },
    })

    const handleClickOpen = (Id: number) => {
        setUserId(Id)
        setOpen(!open)
    }

    const deleteUser = (user: User) => {
        dispatch({type: DELETE_USER, payload: user.id})
    }

    return (<>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-title">
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-title">Change user`s data</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id='firstName'
                            label='First Name'
                            type='text'
                            name="firstName"
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            value={formik.values.firstName}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id='lastName'
                            label='Last Name'
                            type='text'
                            name="lastName"
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            value={formik.values.lastName}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id='password'
                            label='Password'
                            type='password'
                            name="password"
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            value={formik.values.password}
                            helperText={formik.touched.password && formik.errors.password}
                        />
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
                            id='role'
                            label='Role'
                            type='text'
                            name="role"
                            onChange={formik.handleChange}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            value={formik.values.role}
                            helperText={formik.touched.role && formik.errors.role}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button
                            type='submit'
                            color='primary'
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={handleClose}
                            color='primary'
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        <div style={{display: 'flex', paddingLeft: '97px'} }>
            <div className={classes.headerItem}><h3>First Name </h3></div>
            <div className={classes.headerItem}><h3>Last Name </h3></div>
            <div className={classes.headerItem}><h3>Todos Count</h3></div>
            <div className={classes.headerItem}><h3>Email </h3></div>
            <div className={classes.headerItem}><h3>Password</h3></div>
            <div className={classes.headerItem}><h3>Role </h3></div>
        </div>
            <List dense className={classes.root}>
                {users.map((value: User, index: number) => {
                    return (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{height: '80px', width: '80px'}}
                                    alt={`Avatar n°${value.firstName[0] + value.lastName[0]}`}
                                    src={value.photo}
                                />
                            </ListItemAvatar>
                            <div style={{display: 'flex'}}>
                                <div className={classes.item}>{value.firstName}</div>
                                <div className={classes.item}>{value.lastName}</div>
                                <div className={classes.item}>{value.todosCount}</div>
                                <div className={classes.item}>{value.email}</div>
                                <div className={classes.item}>{value.password}</div>
                                <div className={classes.item}>{value.role}</div>
                               
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => deleteUser(value)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<EditIcon/>}
                                    onClick={() => handleClickOpen(value.id)}
                                >
                                    Edit
                                </Button>

                            </div>
                        </ListItem>

                    );
                })}
            </List>

        </>
    );
}

