import React from "react";
import {Item} from '../Interfaces';
import './TodoItem.css'

interface Props {
    item: Item,
    completeTodo: (item: Item) => void,
    deleteItem: (id: number) => void,
    editItem: (item: Item) => void,
}

export default function TodoItem({item, completeTodo, deleteItem, editItem}: Props) {
    
    const completeTodoItem = (item: Item) => {
        completeTodo({id: item.id, text: item.text, finished: !item.finished});
    }

    const removeItem = (item: Item) => {
        deleteItem(item.id);
    }

    const updateItem = (item: Item) => {
        editItem(item);
    }

    return (
        <div className={'Todo-item'}>

            <input className={'checkBox-button'}
                   type="checkbox"
                   checked={item.finished}
                   onChange={() => {}}
                   onClick={() => completeTodoItem(item)}
            />
            {item.finished ? <s>{item.text}</s> : item.text}

            <div className={'buttons-block'}>
                <input className={'button'} type="button" onClick={() => updateItem(item)} value="Edit"/>
                <input className={'button'} type="button" onClick={() => removeItem(item)} value="Delete"/>
            </div>

        </div>
    )
}