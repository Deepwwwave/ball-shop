import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart, updateItemQuantity } from '../store/slices/cart'; // Importez les actions de votre slice de panier

const useCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items); // Récupérez les articles du panier depuis le state Redux

    const addToCart = (item) => dispatch(addItem(item));
    const removeFromCart = (itemId) => dispatch(removeItem(itemId));
    const clearCartItems = () => dispatch(clearCart());
    const updateCartItemQuantity = (itemId, quantity) => dispatch(updateItemQuantity({ id: itemId, quantity }));

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCartItems,
        updateCartItemQuantity,
    };
};

export default useCart
