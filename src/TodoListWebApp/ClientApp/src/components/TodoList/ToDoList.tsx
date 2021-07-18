import React, {useState, useEffect} from 'react';
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
import {TransitionProps} from "@material-ui/core/transitions";
import {
    AppBar,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Toolbar
} from "@material-ui/core";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


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

        box: {},


    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function ToDoList() {

    const classes = useStyles();
    const [value, setValue] = useState("")
    const todos: Item[] = useSelector((state: IRootState) => state.todos.items)
    const [inputEditHideBtn, setInputEditHideBtn] = useState(false)
    const loading: boolean = useSelector((state: IRootState) => state.todos.loading)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch({type: GET_TODO_LIST, payload: []})
    }, [page])// eslint-disable-line react-hooks/exhaustive-deps


    const [columns, setColumns] = useState({
        new: {
            name: "New",
            items: todos
        },
        inProgress: {
            name: "In Progress",
            items: []
        },
        done: {
            name: "Done",
            items: [{id: 4, text: '123', isComplete: false, createdDate: ''}]
        },

    })

    useEffect(() => {
        columns.new.items = todos;
    }, [todos])


    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const addTodos = (text: string) => {
        if (text !== '') {
            dispatch({type: ADD_TODO, payload: text})
            setValue('')
        }
        handleClose()
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
    const handleClose = () => {
        setInputEditHideBtn(!inputEditHideBtn);
    }

    const onDragEnd = (result: any, columns: any, setColumns: any) => {
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    return (
        <Box className={classes.box} component="span" m={1}>

            <AppBar position="absolute">
                <Toolbar>
                    <LeftPanel/>
                </Toolbar>
            </AppBar>

            <Dialog TransitionComponent={Transition}
                    keepMounted
                    open={inputEditHideBtn}
                    onClose={handleClose}
                    aria-labelledby="form-title"
            >
                <DialogTitle id="form-title">Creating item</DialogTitle>
                <DialogContent>
                    <TextField
                        placeholder="Write text"
                        label="Email address"
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


            <div style={{display: 'flex', justifyContent: 'center'}}>
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
                    <DragDropContext
                        onDragEnd={result => onDragEnd(result, columns, setColumns)}
                    >
                        <h1 style={{
                            display: "flex",
                            justifyContent: "spaceBetween",
                            flexDirection: 'row',
                            height: "100%"
                        }}>
                            {Object.entries(columns).map(([columnId, column], index) => {
                                return (
                                    <div

                                        key={columnId}
                                    >
                                        <h6 style={{display: "flex", justifyContent: 'center'}}>{column.name}</h6>
                                        <div>
                                            <Droppable droppableId={index.toString()} key={index}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            style={{
                                                                background: snapshot.isDraggingOver
                                                                    ? "#ecf8ec"
                                                                    : "#d7ddf6",
                                                                padding: 4,
                                                                width: 325,
                                                                minHeight: 300,
                                                                borderColor: 'blue',
                                                                border: 'solid',
                                                                margin: '3px',
                                                                borderWidth: '0.5px'

                                                            }}
                                                        >
                                                            {index === 0 ? <Button
                                                                style={{width: 310, marginLeft: '7px'}}
                                                                onClick={() => addTodos(value)}
                                                                variant="contained"
                                                                color="primary"
                                                            >
                                                                Create
                                                            </Button> : ''}

                                                            {column.items.map((item, index) => {
                                                                return (

                                                                    <Draggable
                                                                        key={item.id}
                                                                        draggableId={item.id.toString()}
                                                                        index={index}
                                                                    >

                                                                        {(provided) => {
                                                                            return (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                >

                                                                                    <TodoItem key={index}
                                                                                              item={item}
                                                                                              completeTodo={completeTodo}
                                                                                              deleteItem={deleteItem}
                                                                                              editItem={editItem}
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                );
                                                            })}
                                                            {provided.placeholder}
                                                        </div>
                                                    );
                                                }}
                                            </Droppable>
                                        </div>
                                    </div>
                                );
                            })}
                        </h1>
                    </DragDropContext>

                </InfiniteScroll>
                <SimpleBackdrop hidden={loading}/>
            </div>

        </Box>

    )
}
