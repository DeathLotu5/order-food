import {createContext, useReducer, useState} from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {
    },
    removeItem: (id) => {
    }
});

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

function cartReducer(state, action) {
    if (action.type === ADD_ITEM) {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];
        const existingItem = state.items[existingCartItemIndex];
        if (existingCartItemIndex > -1) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({
                ...action.item,
                quantity: 1
            });
        }

        return {
            ...state,
            items: updatedItems
        };
    }


    if (action.type === REMOVE_ITEM) {
        console.log("State In Remove 1", state);
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [
            ...state.items
        ]

        console.log("State In Remove 2", updatedItems);
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else if (existingCartItem.quantity > 1) {
            updatedItems[existingCartItemIndex] = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
        }
        console.log("State In Remove 3", {
            ...state,
            items: updatedItems
        });
        return {
            ...state,
            items: updatedItems
        };
    }

    return state;
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction,] = useReducer(cartReducer, {
        items: []
    })

    function addItem(item) {
        dispatchCartAction({
            type: ADD_ITEM,
            item
        })
    }

    function removeItem(id) {
        dispatchCartAction({
            type: REMOVE_ITEM,
            id
        })
    }

    const cartContext =  {
        items: cart.items,
        addItem,
        removeItem
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;