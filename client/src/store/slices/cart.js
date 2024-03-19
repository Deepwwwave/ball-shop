import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
   const storedCart = localStorage.getItem("cart");
   return storedCart !== null
      ? JSON.parse(storedCart)
      : {
           items: [],
           totalItems: 0,
           totalCartPrice: 4.95,
        };
};

const cart = createSlice({
   name: "cart",
   initialState: getInitialState(),
   reducers: {
      addItem(state, action) {
         const newItem = action.payload;
         const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);
         if (existingItemIndex !== -1) {
            state.items[existingItemIndex].itemQuantity += 1;
            state.items[existingItemIndex].totalPrice = parseFloat(newItem.price) * state.items[existingItemIndex].itemQuantity; // Mise à jour du prix total de l'article en fonction de la nouvelle quantité
         } else {
            state.items.push({ ...newItem, itemQuantity: 1, totalPrice: parseFloat(newItem.price) }); // Création d'une nouvelle propriété totalPrice pour l'article
         }
         state.totalItems += 1;
         state.totalCartPrice = state.items.reduce((total, item) => total + item.totalPrice, 4.95); // Mise à jour du prix total en fonction des prix totaux de chaque produit
         localStorage.setItem("cart", JSON.stringify(state)); // Mise à jour du local storage
      },
      
      removeItem(state, action) {
         const itemId = action.payload;
         const itemToRemoveIndex = state.items.findIndex((item) => item.id === itemId);
         if (itemToRemoveIndex !== -1) {
            const itemToRemove = state.items[itemToRemoveIndex];
            state.totalItems -= itemToRemove.itemQuantity;
            state.totalCartPrice -= itemToRemove.totalPrice;
            state.items.splice(itemToRemoveIndex, 1);
         }
         localStorage.setItem("cart", JSON.stringify(state)); // Mise à jour du local storage
      },

      clearCart(state) {
         state.items = [];
         state.totalItems = 0;
         state.totalCartPrice = 4.95;
         localStorage.removeItem("cart"); // Suppression des données du panier du local storage
      },

      substractItemQuantity(state, action) {
         const itemId = action.payload;
         const itemToUpdate = state.items.find((item) => item.id === itemId);
         if (itemToUpdate && itemToUpdate.itemQuantity > 0) {
            itemToUpdate.itemQuantity--;
            itemToUpdate.totalPrice = parseFloat(itemToUpdate.price) * itemToUpdate.itemQuantity; // Mise à jour du prix total de l'article en fonction de la nouvelle quantité
            state.totalItems--;
            state.totalPrice -= itemToUpdate.price;
            if (itemToUpdate.itemQuantity === 0) {
               state.items = state.items.filter((item) => item.id !== itemId);
            }
         }
         state.totalCartPrice = state.items.reduce((total, item) => total + item.totalPrice, 4.95); // Mise à jour du prix total en fonction des prix totaux de chaque produit
         localStorage.setItem("cart", JSON.stringify(state)); // Mise à jour du local storage
      },
      
      updateItems(state, action) {
         const newItems = action.payload;

         // Filtrer les éléments du panier qui ne se trouvent pas dans newItems ou dont les données (hors itemQuantity) sont différentes
         state.items = state.items.filter((existingItem) => {
            const newItem = newItems.find((item) => item.id === existingItem.id);
            if (newItem) {
               const { itemQuantity, totalPrice, ...restExistingItem } = existingItem;
               const { itemQuantity: newQuantity, totalPrice: newTotalPrice, ...restNewItem } = newItem;
               return JSON.stringify(restExistingItem) === JSON.stringify(restNewItem);
            }
            return false;
         });

         // Mettre à jour state.totalItems et state.totalPrice en fonction des modifications
         state.totalItems = state.items.reduce((total, item) => total + item.itemQuantity, 0);
         state.totalCartPrice = state.items.reduce((total, item) => total + item.totalPrice, 4.95);

         localStorage.setItem("cart", JSON.stringify(state)); // Mise à jour du local storage
      },
   },
});

export const { addItem, removeItem, clearCart, substractItemQuantity, updateItems } = cart.actions;

export default cart.reducer;
