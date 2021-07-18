import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../redux/configureStore";
import {Collapse} from "@material-ui/core";
import {CLEAR_ERROR_MESSAGE} from "../../redux/constants";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);


export default function ErrorAlertComponent() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const errorMessage: string = useSelector((errorMessage: IRootState) => errorMessage.error)

    return (
        <div className={classes.root}>
            <Collapse in={Boolean(errorMessage)}>
                    <Alert variant="outlined" severity="error" onClose={() => {
                        dispatch({type: CLEAR_ERROR_MESSAGE, payload: ''})
                    }}> {errorMessage}</Alert>
            </Collapse>
        </div>
    );
}