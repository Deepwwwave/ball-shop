import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity += newItem.quantity;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.totalItems += newItem.quantity;
            state.totalPrice += newItem.price * newItem.quantity;
            localStorage.setItem('cart', JSON.stringify(state)); // Mise à jour du local storage
        },
        removeItem(state, action) {
            const itemId = action.payload;
            const itemToRemoveIndex = state.items.findIndex(item => item.id === itemId);
            if (itemToRemoveIndex !== -1) {
                const itemToRemove = state.items[itemToRemoveIndex];
                state.totalItems -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
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
        updateItemQuantity(state, action) {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);
            if (itemToUpdate) {
                const prevQuantity = itemToUpdate.quantity;
                itemToUpdate.quantity = quantity;
                state.totalItems += quantity - prevQuantity;
                state.totalPrice += itemToUpdate.price * (quantity - prevQuantity);
            }
            localStorage.setItem('cart', JSON.stringify(state)); // Mise à jour du local storage
        },
    }
});

export const { addItem, removeItem, clearCart, updateItemQuantity } = cart.actions;

export default cart.reducer;
