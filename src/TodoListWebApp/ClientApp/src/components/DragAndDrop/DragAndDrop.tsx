import React from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import {Item, TodoColumn} from "../Interfaces";
import TodoItem from "../TodoItem/TodoItem";
import {COMPLETE_TODO, DELETE_COLUMN_BY_ID, DELETE_TODO, EDIT_TODO} from "../../redux/constants";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../redux/configureStore";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

interface Props {
    openDialog: (close: boolean) => void,
}

export default function DragAndDrop({openDialog}: Props) {

    const classes = useStyles();
    const columns: TodoColumn[] = useSelector((state: IRootState) => state.todos.todoColumns)

    const deleteColumn = (columnId: number) => {
        dispatch({type: DELETE_COLUMN_BY_ID, payload: columnId})
    }
    const dispatch = useDispatch();

    const deleteItem = (id: number) => {
        dispatch({type: DELETE_TODO, payload: id})
    }
    const completeTodo = (item: Item) => {
        dispatch({type: COMPLETE_TODO, payload: item})
    }
    const editItem = (item: Item) => {
        dispatch({type: EDIT_TODO, payload: {id: item.id, text: item.text, finished: item.isComplete}})
    }

    const openDlg = () => {
        openDialog(true)
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
    const setColumns = () => {

    }

    return (
        <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
            <Paper style={{
                display: "flex",
                justifyContent: "spaceBetween",
                flexDirection: 'row',
                height: "100%"
            }}>
                {columns.map((column, index) => {

                    return (
                        <Paper
                            key={column.id}
                        >
                            <Paper>
                                <Typography variant="h5"
                                            className={classes.colName}>{column.columnName}</Typography>
                            </Paper>
                            <div className={classes.btnInTodoItem}>
                                <Button onClick={() => deleteColumn(column.id)}>
                                    <DeleteOutlineIcon/>
                                </Button>
                                <Button>
                                    <AutorenewIcon/>
                                </Button>
                                {index === 0 ? <Button
                                    onClick={openDlg}
                                >
                                    <NoteAddIcon/>
                                </Button> : ''}

                            </div>
                            <div>
                                <Droppable droppableId={column.id.toString()} key={index}>
                                    {(provided, snapshot) => {
                                        return (
                                            <Paper
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{

                                                    padding: 4,
                                                    width: 325,
                                                    minHeight: 270,
                                                    borderColor: 'blue',
                                                    border: 'solid',
                                                    margin: '3px',
                                                    borderWidth: '0.5px'

                                                }}
                                            >

                                                {column.todoItems.map((item: Item, index: number) => {
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
                                            </Paper>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </Paper>
                    );
                })}
            </Paper>
        </DragDropContext>
    );
}

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