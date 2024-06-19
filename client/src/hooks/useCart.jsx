import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart, substractItemQuantity, updateItems } from '../store/slices/cart'; // Importez les actions de votre slice de panier

// Permet de récupérer les infos du state global du panier produit (cart) et de les modifier.
// useCart est utilisé dans les composants ayant besoin de récupérer ou de modifier les infos du panier produit.
const useCart = () => {
    const dispatch = useDispatch();
    const { items: cartItems, totalItems, totalCartPrice } = useSelector(state => state.cart);

    const addToCart = (item) => dispatch(addItem(item));
    const removeFromCart = (itemId) => dispatch(removeItem(itemId));
    const clearCartItems = () => dispatch(clearCart());
    const substractItemFromCart = (itemId) => dispatch(substractItemQuantity(itemId));
    const updateCart = (products) => dispatch (updateItems(products));

    
    return {
        cartItems,
        totalItems,
        totalCartPrice,
        addToCart,
        removeFromCart,
        clearCartItems,
        substractItemFromCart,
        updateCart
    };
};

export default useCart
