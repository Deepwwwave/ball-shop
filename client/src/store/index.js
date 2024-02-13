import {configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/user';
import productsReducer from './slices/products';

const store = configureStore({

    reducer: {
        user: userReducer,
        products: productsReducer
    }

})

export default store