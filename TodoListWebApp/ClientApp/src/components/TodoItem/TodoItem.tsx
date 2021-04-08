import React, {useState} from "react";
import {Item} from '../Interfaces';
import './TodoItem.css'
import Button from "@material-ui/core/Button";
import {
    Checkbox, createMuiTheme,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControlLabel,
    Paper,
    Slide,
    TextField, ThemeProvider, Typography,
} from "@material-ui/core";
import {TransitionProps} from '@material-ui/core/transitions';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditIcon from '@material-ui/icons/Edit';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    item: Item,
    completeTodo: (item: Item) => void,
    deleteItem: (id: number) => void,
    editItem: (item: Item) => void,
}

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#4df608',
        },
        primary: {
            main: '#f62c08',
        },
    },
});
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '985px',
            height: '80px',
            margin: '3px',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },

        divider: {
            height: 28,
            width: '4px',
            margin: 4,
        },
        button: {
            width: '55px',
            marginLeft: '3px',

        },

    }),
);
export default function TodoItem({item, completeTodo, deleteItem, editItem}: Props) {
    const classes = useStyles();
    const [inputEditHideBtn, setInputEditHideBtn] = useState(false)
    const [value, setValue] = useState('')

    const handleClose = () => {
        setInputEditHideBtn(!inputEditHideBtn);
    }
    const completeTodoItem = (item: Item) => {
        completeTodo({id: item.id, text: item.text, isComplete: !item.isComplete});
    }
    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const removeItem = (item: Item) => {
        deleteItem(item.id);
    }
    const editedItem = () => {
        editItem({...item, text: value});
        setInputEditHideBtn(!inputEditHideBtn);
    }
    return (
        <>
            <Dialog TransitionComponent={Transition}
                    keepMounted
                    open={inputEditHideBtn}
                    onClose={handleClose}
                    aria-labelledby="form-title"
            >
                <DialogTitle id="form-title">Change todo`s text</DialogTitle>
                <DialogContent>
                    <TextField
                        placeholder="Write new text here"
                        label="Edit Todo"
                        style={{width: '400px'}}
                        onChange={textChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color='primary'
                        onClick={() => editedItem()}
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
            </Dialog>

            <Paper component="form" className={classes.root}>
                <ThemeProvider theme={theme}>
                        <FormControlLabel style={{marginLeft: '10px'}}
                            onClick={() => completeTodoItem(item)}
                            control={<Checkbox icon={<FavoriteBorder color={'primary'}/>}
                                               checkedIcon={<Favorite color={'secondary'} />}
                                               name="checkedH"
                                               checked={item.isComplete}
                                               onChange={() => {
                                               }}/>}
                            label=""
                        />
                </ThemeProvider>
                <Typography  variant="h5">{item.isComplete ? <s>{item.text}</s> : item.text}</Typography>
                <div style={{display: 'flex'}}>
                    <Divider className={classes.divider} orientation="vertical"/>
                    <Button
                        className={classes.button}
                        onClick={() => removeItem(item)}
                        variant="contained"
                        color="primary"
                    >
                        <DeleteForeverOutlinedIcon  />
                    </Button>

                    <Button
                        className={classes.button}
                        onClick={() => setInputEditHideBtn(!inputEditHideBtn)}
                        variant="contained"
                        color="primary"
                    >
                        <EditIcon />
                    </Button>
                </div>
            </Paper>

        </>
    )
}