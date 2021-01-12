import React, {useState} from 'react';
import './ToDoList.css';
import TodoItem from "./Components/TodoItem/TodoItem";
import {Item} from "./Components/Item";
import axios from './API';

export default function Home () {
    const [value, setValue] = useState("");
    const [index, setIndex] = useState(4);
    const [inputHide, setInputHide] = useState(false);
    const [inputEditHideBtn, setInputEditHideBtn] = useState(true);
   
    const initialValue = [
        {id: 0, value: "qq11qqq", finished: false},
        {id: 1, value: "wwwww", finished: false},
        {id: 2, value: "1eeee23123", finished: false},
        {id: 3, value: "ffffff", finished: false}
    ];

    const [todos, setTodos] = useState(initialValue);

    const changeHideInput = () => {
        setInputHide(!inputHide);
    }

    const textChanged = (e : React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    
    const addTodos = (text : string) => {
        let newItem = [...todos];
        setIndex(index + 1);
        newItem.push({id: index, value: text, finished: false});
        setTodos(newItem);
        setValue('');
        setInputHide(!inputHide);
    }

    const deleteItem = (id : number)=> {
        setTodos(todos.filter(x => x.id !== id));
        
    }

    const isCheked = (id : number) => {

        let newArray = todos.map((x) => {
            if (x.id === id) {
                x.finished = true
            }
            return x;
        })

        setTodos(newArray);
    }

    const editItem = (item : Item) => {
        setInputEditHideBtn(!inputEditHideBtn);
        if(value !== ''){
            const newArray = todos.map((x) => {
                if (x.id === item.id){
                    x.value = value;
                }
                return x;
            });
            setValue('');
            setTodos(newArray);
        } 
        
       
    }

    return (
        <div >
            <input type="button" value="Create todos" onClick={() => changeHideInput()}/>

            <div hidden={!inputHide}>
                <input placeholder="Write todos here" type="text" onChange={textChanged}/>
                <input value="Create" type="button" onClick={() => addTodos(value)}/>
            </div>
            <input hidden={inputEditHideBtn}  type='text' placeholder="Write new text here" onChange={textChanged} id="editInp"/>
            <h1>{todos.map((x, index) =>
                <TodoItem item={x} isCheked={isCheked} deleteItem={deleteItem} editItem={editItem} />)}
            </h1>
        </div>
    );
}
