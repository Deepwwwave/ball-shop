import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        loadProductsReducer(state, action) {
            state.products = [...action.payload];
        },
        addProductReducer(state, action) {
            const newProduct = action.payload;
            state.products = [...state.products, newProduct];
        },
    },
});

export const { loadProductsReducer, addProductReducer } = products.actions;

export default products.reducer;