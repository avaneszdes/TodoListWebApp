import React, {useState} from "react";
import {Item} from '../Interfaces';
import Button from "@material-ui/core/Button";
import {
    Checkbox,
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
import EditIcon from '@material-ui/icons/Edit';
import {createTheme} from '@material-ui/core/styles'
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

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

const theme = createTheme({
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
        childPaper: {
            padding: '2px 4px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '290px',
            height: '190px',
            margin: '3px',
        },
        mainPaper: {
            padding: '2px 4px',
            alignItems: 'left',
            width: '300px',
            height: '250px',
            marginTop: '6px',
            marginLeft: '6px',
            backgroundColor: '#dbeeef',
            borderStyle: 'solid',
            borderColor: '#b9c6ba',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },

        divider: {
            height: 25,
            width: '2px',
            margin: 4,
        },
        button: {
            width: '30px',
            height: '25px',
            marginLeft: '3px',
            marginTop: '3px',

        },

        date: {
            marginLeft: theme.spacing(0.5),
            marginTop: theme.spacing(-0.5),
            width: '130px',
            fontSize: 12

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
        completeTodo(
            {
                id: item.id,
                text: item.text,
                isComplete: !item.isComplete,
                createdDate: item.createdDate
            });
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
                <DialogTitle id="form-title">Change todo item text</DialogTitle>
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
                        id="updateTodoItem"
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

            <Paper component="form" className={classes.mainPaper}>
                <div style={{display: 'flex'}}>
                    <ThemeProvider theme={theme}>
                        <FormControlLabel style={{marginLeft: '10px', marginTop: '-5px'}}
                                          onClick={() => completeTodoItem(item)}
                                          control={<Checkbox icon={<FavoriteBorder color={'primary'}/>}
                                                             checkedIcon={<Favorite color={'secondary'}/>}
                                                             name="checkedH"
                                                             checked={item.isComplete}
                                                             onChange={() => {
                                                             }}/>}
                                          label=""
                        />
                    </ThemeProvider>
                    <Divider className={classes.divider} orientation="vertical"/>
                    <Button
                        className={classes.button}
                        onClick={() => removeItem(item)}
                    >
                        <DeleteOutlineIcon/>
                    </Button>

                    <Button
                        id={item.id.toString()}
                        className={classes.button}
                        onClick={() => setInputEditHideBtn(!inputEditHideBtn)}
                    >
                        <EditIcon/>
                    </Button>
                </div>
                <Paper className={classes.childPaper}>
                    <Typography variant="h5">{item.isComplete ? <s>{item.text}</s> : item.text}</Typography>
                </Paper>
                <Typography className={classes.date}>{item.createdDate}</Typography>
            </Paper>


        </>
    )
}