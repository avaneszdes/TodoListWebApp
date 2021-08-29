import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch} from "react-redux";
import {CREATE_TODO_COLUMN} from "../../redux/constants";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";

export default function LeftPanelDialog() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogText, setDialogText] = React.useState('');
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const dialogTextChanged = (e: any) => setDialogText(e.target.value);

    const createColumn = (name: string) => {
        dispatch({type: CREATE_TODO_COLUMN, payload: name})
        setOpenDialog(false);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <div className={classes.addColBloc}>
                <AddIcon/>
                <Button className={classes.addColBtn} variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add Column
                </Button>
            </div>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please write name of new column.
                    </DialogContentText>
                    <TextField
                        onChange={dialogTextChanged}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        value={dialogText}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => createColumn(dialogText)} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    addColBloc: {
        display: 'flex',
        justifyContent: 'spaceBetween',
        alignItems: 'center',
        width: '250px',
        marginLeft: '15px'
    },
    addColBtn: {
        width: '180px',
        marginLeft: '20px'
    }
}))