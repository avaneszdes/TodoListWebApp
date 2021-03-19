import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

interface ComponentProps {
    hidden: boolean;
}
export default function SimpleBackdrop(props: ComponentProps) {
    const classes = useStyles();
    return (
        <div>
            <Backdrop className={classes.backdrop} open={props.hidden}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}