import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart !== null ? JSON.parse(storedCart) : {
        items: [],
        totalItems: 0,
        totalPrice: 0,
    };
};

const cart = createSlice({
    name: 'cart',
    initialState: getInitialState(),
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].itemQuantity += 1;
            } else {
                state.items.push({ ...newItem, itemQuantity: 1 });
            }
            state.totalItems += 1;
            state.totalPrice += parseFloat(newItem.price);
            localStorage.setItem('cart', JSON.stringify(state)); // Mise à jour du local storage
        },
        removeItem(state, action) {
            const itemId = action.payload;
            const itemToRemoveIndex = state.items.findIndex(item => item.id === itemId);
            if (itemToRemoveIndex !== -1) {
                const itemToRemove = state.items[itemToRemoveIndex];
                state.totalItems -= itemToRemove.itemQuantity;
                state.totalPrice -= parseFloat(itemToRemove.price * itemToRemove.itemQuantity);
                state.items.splice(itemToRemoveIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(state)); // Mise à jour du local storage
        },
        clearCart(state) {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            localStorage.removeItem('cart'); // Suppression des données du panier du local storage
        },
        substractItemQuantity(state, action) {
            const itemId = action.payload;
            const itemToUpdate = state.items.find(item => item.id === itemId);
            if (itemToUpdate && itemToUpdate.itemQuantity > 0) {
                itemToUpdate.itemQuantity--;
                state.totalItems--;
                state.totalPrice -= parseFloat(itemToUpdate.price);
                if (itemToUpdate.itemQuantity === 0) {
                    state.items = state.items.filter(item => item.id !== itemId);
                }
            }
            localStorage.setItem('cart', JSON.stringify(state)); // Mise à jour du local storage
        },
        
    }
});

export const { addItem, removeItem, clearCart, substractItemQuantity } = cart.actions;

export default cart.reducer;
