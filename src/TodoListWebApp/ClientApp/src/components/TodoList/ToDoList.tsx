import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_TODO,
    GET_ALL_COLUMNS
} from '../../redux/constants';
import {IRootState} from "../../redux/configureStore";
import SimpleBackdrop from "../BackDrop/BackDrop";
import LeftPanel from "../LeftPanel/LeftPanel";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    AppBar,
    Box,
    Toolbar
} from "@material-ui/core";
import DialogTodoList from '../DialogTodoList/DialogTodoList';
import DragAndDrop from "../DragAndDrop/DragAndDrop";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        button: {
            width: '1000px',
            marginTop: '70px',
        },
        input: {
            width: '915px'
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1)
        },
        dialog: {
            width: '500px'
        },

        title: {
            flexGrow: 1,
        },
        btnInTodoItem: {
            display: 'flex',
            justifyContent: 'spaceBetween'
        },
        colName: {
            marginTop: '50px',
            display: 'flex',
            justifyContent: 'center'
        },
        appBar: {
            height: '50px'
        }


    }),
);


export default function ToDoList() {


    const loading: boolean = useSelector((state: IRootState) => state.todos.loading)
    const [openDlg, setOpenDlg] = useState(false)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: GET_ALL_COLUMNS, payload: []})
    }, [])

    const addTodos = (text: string) => {
        if (text !== '') {
            dispatch({type: ADD_TODO, payload: text})
        }
    }


    return (
        <Box component="span" m={1}>
            <AppBar className={classes.appBar} position="absolute">
                <Toolbar>
                    <LeftPanel/>
                </Toolbar>
            </AppBar>

            <DragAndDrop openDialog={setOpenDlg} />
            <DialogTodoList closeDialog={setOpenDlg} addTodo={addTodos} openDialog={openDlg}/>
            <SimpleBackdrop hidden={loading}/>

        </Box>

    )
}
