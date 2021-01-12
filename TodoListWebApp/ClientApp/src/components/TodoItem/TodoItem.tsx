import React from "react";
import {Item} from "../Item";
import './TodoItem.css'

interface Props {
    item: Item,
    isCheked: (id: number) => void,
    deleteItem: (id: number) => void,
    editItem: (item: Item) => void,
}

export default function TodoItem({item, isCheked, deleteItem, editItem}: Props) {

    const isChekedItem = (item: Item) => {
        isCheked(item.id);

    }

    const removeItem = (item: Item) => {
        deleteItem(item.id);
    }

    const updateItem = (item: Item) => {
        editItem(item);
    }

    return (
        <div className={'Todo-item'} >
            <input type="checkbox" checked={item.finished} onChange={() => {
            }} onClick={() => isChekedItem(item)}/>
            {item.finished ? <s>{item.value}</s> : item.value}
            <div>
                <input type="button" onClick={() => updateItem(item)} value="Edit"/>
                <input type="button" onClick={() => removeItem(item)} value="Delete"/>
            </div>

        </div>
    )
}