import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TransitionProps} from "@material-ui/core/transitions";
import {Slide} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    addTodo: (text: string) => void,
    openDialog: boolean,
    closeDialog: (close: boolean) => void
}

export default function TodoListDialog({addTodo, openDialog, closeDialog} : Props) {

    const [value, setValue] = useState("")
    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const addTodos = (text: string) => {
        if (text !== '') {
            addTodo(text)
            setValue('')
        }
        closeDialog(false)
    }

    const handleClose = () => {
        closeDialog(false)
    }

    return (
        <Dialog TransitionComponent={Transition}
                keepMounted
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="form-title"
        >
            <DialogTitle id="form-title">Creating item</DialogTitle>
            <DialogContent>
                <TextField
                    placeholder="Write text"
                    label="Todo Text"
                    style={{width: '400px'}}
                    onChange={textChanged}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    onClick={() => addTodos(value)}
                >
                    Create item
                </Button>
                <Button
                    onClick={handleClose}
                    color='primary'
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
