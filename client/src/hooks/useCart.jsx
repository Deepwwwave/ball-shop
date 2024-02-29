import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart, substractItemQuantity } from '../store/slices/cart'; // Importez les actions de votre slice de panier

const useCart = () => {
    const dispatch = useDispatch();
    const { items: cartItems, totalItems, totalPrice } = useSelector(state => state.cart);

    const addToCart = (item) => dispatch(addItem(item));
    const removeFromCart = (itemId) => dispatch(removeItem(itemId));
    const clearCartItems = () => dispatch(clearCart());
    const substractItemFromCart = (itemId) => dispatch(substractItemQuantity(itemId));
    const updateCart = () => dispatch (updateItems());

    return {
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCartItems,
        substractItemFromCart,
        updateCart
    };
};

export default useCart
