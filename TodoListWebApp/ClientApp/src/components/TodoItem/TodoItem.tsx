import React from "react";
import {Item} from "../Item";
import './TodoItem.css'

interface Props {
    item: Item,
    isCheked: (item: Item) => void,
    deleteItem: (id: number) => void,
    editItem: (item: Item) => void,
}

export default function TodoItem({item, isCheked, deleteItem, editItem}: Props) {

    const isChekedItem = (item: Item) => {
        isCheked(item);

    }

    const removeItem = (item: Item) => {
        deleteItem(item.id);
    }

    const updateItem = (item: Item) => {
        editItem(item);
    }

    return (
        <div className={'Todo-item'}>
            <input className={'checkBox-button'} type="checkbox" checked={item.finished} onChange={() => {
            }} onClick={() => isChekedItem(item)}/>
            {item.finished ? <s>{item.text}</s> : item.text}

            <div className={'buttons-block'}>
                <input className={'button'} type="button" onClick={() => updateItem(item)} value="Edit"/>
                <input className={'button'} type="button" onClick={() => removeItem(item)} value="Delete"/>
            </div>

        </div>
    )
}