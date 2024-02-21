// Utilitaire pour vérifier si un produit est présent dans le panier
export const isProductInCart = (productId, cartItems) => {
    return cartItems.some(item => item.id === productId);
};
