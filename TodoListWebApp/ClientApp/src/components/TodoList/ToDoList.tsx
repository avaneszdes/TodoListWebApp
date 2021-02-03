import React, {useState, useEffect} from 'react';
import './ToDoList.css';
import TodoItem from "../TodoItem/TodoItem";
import {Item} from '../Interfaces';
import {useDispatch, useSelector} from "react-redux";
import {ADD_TODO, EDIT_TODO, COMPLETE_TODO, DELETE_TODO, GET_TODO_LIST} from '../../redux/constants';
import {IRootState} from "../../redux/configureStore";

export default function ToDoList() {
    
    const [value, setValue] = useState("");
    const [inputHide, setInputHide] = useState(false);
    const [inputEditHideBtn, setInputEditHideBtn] = useState(true);
    const todos = useSelector((state: IRootState) => state.todos)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({type: GET_TODO_LIST, payload: []})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeHideInput = () => setInputHide(!inputHide);
    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const addTodos = (text: string) => {
        if (text !== '') {
            dispatch({type: ADD_TODO, payload: text})
            setValue('')
        }
        setInputHide(!inputHide);
    }

    const deleteItem = (id: number) => dispatch({type: DELETE_TODO, payload: id})
    const completeTodo = (item: Item) => dispatch({type: COMPLETE_TODO, payload: item})

    const editItem = (item: Item) => {
        setInputEditHideBtn(!inputEditHideBtn);
        if (value) {
            dispatch({type: EDIT_TODO, payload: {id: item.id, text: value, finished: item.finished}})
            setValue('')
        }
    }

    return (
        <div>

            <input className={'button-createTodos'}
                   type="button" value="Create todos"
                   onClick={() => changeHideInput()}
            />

            <div hidden={!inputHide}>
                <input className={'input-todo'}
                       placeholder="Write todos here"
                       type="text"
                       onChange={textChanged}
                       value={value}
                />
                <input className={'buttonCreate'}
                       value="Create"
                       type="button"
                       onClick={() => addTodos(value)}
                />
            </div>
            <div>
                <input className={'input-edit'}
                       hidden={inputEditHideBtn}
                       type='text'
                       placeholder="Write new text here"
                       onChange={textChanged}
                       value={value}

                />

                <h1>{todos.map((x: Item, index: number) =>
                    <TodoItem key={index}
                              item={x}
                              completeTodo={completeTodo}
                              deleteItem={deleteItem}
                              editItem={editItem}
                    />)}
                </h1>
            </div>
        </div>
    );
}
