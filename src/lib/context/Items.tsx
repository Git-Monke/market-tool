"use client"

import React, {createContext, useContext, useState} from "react"

export interface Tag {
    name: string,
    color: string
}

export interface Item {
    name: string,
    cost_to_produce: number,
    minutes_to_make: number,
    tags: Tag[]
}

export interface ItemContext {
    items: Item[],
    addItem: (item: Item) => void 
}

const ItemContext = createContext<ItemContext | undefined>(undefined);

export const useItemContext = () => useContext(ItemContext);

export function Items({ children }: any) {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (item: Item) => {
        setItems(prevItems => [...prevItems, item]);
    };

    const value = {
        items,
        addItem
    };

    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
}