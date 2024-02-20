import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/user';
import productsReducer from './slices/products';
import cartReducer from './slices/cart';

const store = configureStore({

    reducer: {
        user: userReducer,
        products: productsReducer,
        cart: cartReducer
    }

})

export default store