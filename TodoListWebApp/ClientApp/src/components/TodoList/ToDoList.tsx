import React, {useState, useEffect} from 'react';
import './ToDoList.css';
import TodoItem from "../TodoItem/TodoItem";
import {Item} from '../Interfaces';
import {useDispatch, useSelector} from "react-redux";
import {ADD_TODO, EDIT_TODO, COMPLETE_TODO, DELETE_TODO, GET_TODO_LIST} from '../../redux/constants';
import {IRootState} from "../../redux/configureStore";
import InfiniteScroll from "react-infinite-scroll-component";
import SimpleBackdrop from "../BackDrop/BackDrop";
import LeftPanel from "../LeftPanel/LeftPanel";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        button: {
            width: '1000px'
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
        }
    }),
);

export default function ToDoList() {

    const classes = useStyles();
    const [value, setValue] = useState("")
    const [inputHide, setInputHide] = useState(false)

    const todos: Item[] = useSelector((state: IRootState) => state.todos.items)
    const loading: boolean = useSelector((state: IRootState) => state.todos.loading)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch({type: GET_TODO_LIST, payload: []})
    }, [page])// eslint-disable-line react-hooks/exhaustive-deps

    

    const changeHideInput = () => setInputHide(!inputHide);
    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const addTodos = (text: string) => {
        if (text !== '') {
            dispatch({type: ADD_TODO, payload: text})
            setValue('')
        }
        setInputHide(!inputHide);
    }
    const deleteItem = (id: number) => {
        dispatch({type: DELETE_TODO, payload: id})
    }
    const completeTodo = (item: Item) => {
        dispatch({type: COMPLETE_TODO, payload: item})
    }
    const editItem = (item: Item) => {
        dispatch({type: EDIT_TODO, payload: {id: item.id, text: item.text, finished: item.isComplete}})

    }

    return (
        <>
            <LeftPanel/>
            <Button
                className={classes.button}
                onClick={() => changeHideInput()}
                variant="contained"
                color="primary"
            >
                Create item
            </Button>

            <div style={{marginTop: '3px'}} hidden={!inputHide}>
                <TextField
                    placeholder="Write todos here"
                    label="New Todos"
                    onChange={textChanged}
                    value={value}
                    className={classes.input}
                />

                <Button
                    onClick={() => addTodos(value)}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </div>
            <div>
                <InfiniteScroll
                    dataLength={todos.length}
                    next={() => setPage(page + 1)}
                    hasMore={true}
                    loader={<br/>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <h1>{todos.map((x: Item, index: number) =>
                        <TodoItem key={index}
                                  item={x}
                                  completeTodo={completeTodo}
                                  deleteItem={deleteItem}
                                  editItem={editItem}
                        />)}
                    </h1>

                </InfiniteScroll>
                <SimpleBackdrop hidden={loading}/>
            </div>

        </>
    )
        ;
}
