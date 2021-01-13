import React, {useState, useEffect} from 'react';
import './ToDoList.css';
import TodoItem from "./Components/TodoItem/TodoItem";
import {Item} from "./Components/Item";
import axios from './API';

export default function ToDoList() {
    const [value, setValue] = useState("");
    const [inputHide, setInputHide] = useState(false);
    const [inputEditHideBtn, setInputEditHideBtn] = useState(true);
    const [todos, setTodos] = useState<Item[]>([]);

    useEffect(() => {
        axios.get<Item[]>('/TodoList', {headers: {"Content-Type": "application/json"}})
            .then((response) => {
                setTodos(response.data);
            });
    }, [])


    const changeHideInput = () => setInputHide(!inputHide);
    const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    const addTodos = (text: string) => {

        axios.post('/TodoList', {
            text,
            finished: false
        }, {headers: {"Content-Type": "application/json"}}).then((response) => {
            setTodos([...todos, {id: response.data, text, finished: false}]);
        }, (error) => {

        });
        setValue('');
        setInputHide(!inputHide);
    }

    const deleteItem = (id: number) => {

        axios.delete(`/TodoList/${id}`).then((response) => {
            setTodos(todos.filter(x => {
                return x.id !== id;
            }))
        }, (error) => {
            console.log(error);
        });
    }

    const isCheked = (item: Item) => {
        axios.put('/TodoList', {id: item.id, text: item.text, finished: !item.finished})
        let newArray = todos.map((x) => {
            if (x.id === item.id) {
                x.finished = !item.finished
            }
            return x;
        })

        setTodos(newArray);
    }

    const editItem = (item: Item) => {
        setInputEditHideBtn(!inputEditHideBtn);
        if (value !== '') {
            axios.put('/TodoList', {id: item.id, text: value}).then(res => {
                const newArray = todos.map((x) => {
                    if (x.id === item.id) {
                        x.text = value;
                    }
                    return x;
                });
                setValue('');
                setTodos(newArray);
            });

        }
    }

    return (
        <div>

            <input className={'button-createTodos'} type="button" value="Create todos"
                   onClick={() => changeHideInput()}/>

            <div hidden={!inputHide}>
                <input className={'input-todo'} placeholder="Write todos here" type="text" onChange={textChanged}/>
                <input className={'buttonCreate'} value="Create" type="button" onClick={() => addTodos(value)}/>
            </div>
            <div>
                <input className={'input-edit'} hidden={inputEditHideBtn} type='text' placeholder="Write new text here"
                       onChange={textChanged}/>
                <h1>{todos.map((x, index) =>
                    <TodoItem key={index} item={x} isCheked={isCheked} deleteItem={deleteItem} editItem={editItem}/>)}
                </h1>
            </div>
        </div>
    );
}
