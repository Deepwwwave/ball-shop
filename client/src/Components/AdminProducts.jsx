import React, { useState } from "react";
import styles from "../styles/AdminProducts.module.css";
import Article from "../Components/Article";
import MessageToast from "./ui/MessageToast";
import useMessageToast from "../hooks/useMessageToast";
import useProducts from "../hooks/useProducts";
import { reqAddProduct, reqEditProduct, reqDeleteProduct } from "../api/request/admin";

/***********************************************/
/******************* ADD ***********************/
/***********************************************/

function AddArticle() {
   const [message, setMessage] = useMessageToast();
   const [showAddForm, setShowAddForm] = useState(false);
   const [newInfos, setNewInfos] = useState({
      category: "",
      description: "",
      imageUrl: "",
      color: "",
      price: "",
      quantity: "",
      image: undefined,
   });

   //Add
   const handleSubmit = async (e) => {
      try {
         const formData = { ...newInfos };

         console.log(formData);
         const res = await reqAddProduct(formData);
         if (res.response) {
            console.log("Status erreur de requête: " + res.response.data.msg);
            setMessage(res.response.data.msg);
         } else {
            setMessage(res.msg);
         }
         setNewInfos({
            imageUrl: "",
            image: null,
            category: "",
            color: "",
            price: "",
            quantity: "",
            description: "",
         });
      } catch (error) {
         console.error("Error", error);
      }
   };

   //Scroll to top
   const closeButtonScrollToTop = () => {
      setShowAddForm(false);
      window.scrollTo({
         top: 0,
         behavior: "smooth", // Pour un défilement fluide
      });
   };

   return (
      <section className={styles.addContainer}>
         <button onClick={() => setShowAddForm(true)}>Ajouter</button>
         {showAddForm && (
            <form className={styles.productInfo} encType="multipart/form-data">
               <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                     setNewInfos({ ...newInfos, imageUrl: e.target.files[0].name, image: e.target.files[0] });
                  }}
               />
               <input type="text" placeholder="Categorie" onChange={(e) => setNewInfos({ ...newInfos, category: e.target.value })} />
               <input type="text" placeholder="Couleur" onChange={(e) => setNewInfos({ ...newInfos, color: e.target.value })} />
               <input type="number" placeholder="Prix" onChange={(e) => setNewInfos({ ...newInfos, price: e.target.value })} />
               <input type="number" placeholder="Quantité" onChange={(e) => setNewInfos({ ...newInfos, quantity: e.target.value })} />
               <textarea placeholder="Description" style={{ height: "150px" }} onChange={(e) => setNewInfos({ ...newInfos, description: e.target.value })} />
               <button onClick={handleSubmit}>Enregistrer</button>
               <button onClick={closeButtonScrollToTop} className={styles.closeButton}>
                  X
               </button>
            </form>
         )}
         {message && <MessageToast content={message} />}
      </section>
   );
}

/***********************************************/
/*********** EDIT *** & *** DELETE *************/
/***********************************************/

function EditOrDeleteArticle({ productId }) {
   const [newInfos, setNewInfos] = useState({
      category: "",
      description: "",
      imageUrl: "",
      color: "",
      price: "",
      quantity: "",
      image: undefined,
   });

   const [showOptions, setShowOptions] = useState(true); // Affichage des options Save et Delete.
   const [showSaveValidation, setShowSaveValidation] = useState(false); // Affichage "Valider les changements ?" (avec les buttons "oui" et "non")
   const [showDeleteValidation, setShowDeleteValidation] = useState(false); // Affichage => "Voulez vous retirer l'article ?"(avec les buttons "oui" et "non")
   const [message, setMessage] = useMessageToast();

   // Edit
   const handleSaveClick = async (e) => {
      e.preventDefault();
      console.log(newInfos.price);
      try {
         const formData = { ...newInfos };

         console.log(formData);
         const res = await reqEditProduct(formData, productId);
         console.log(productId);

         if (res.response) {
            console.log("Status erreur de requête: " + res.response.status);
            setMessage(res.response.msg);
         } else {
            console.log(res.status + " " + res.msg);
            setMessage(res.msg);
            window.location.reload();
         }
      } catch (error) {
         console.error("Error", error);
      }
   };

   // Delete
   const handleDeleteClick = async (e) => {
      e.preventDefault();
      try {
         const res = await reqDeleteProduct(productId);
         if (res.response) {
            setMessage(res.response.msg);
         } else {
            setMessage(res.msg);
            window.location.reload();
         }
      } catch (error) {
         console.error("Error", error);
      }
   };

   // Gestion affichage des buttons "sauvegarder" et "delete" et affichage des buttons de confirmation "oui et "non"
   const validation = (type) => {
      if (type === "save") {
         if (!showSaveValidation) {
            setShowSaveValidation(!showSaveValidation);
            setShowDeleteValidation(false);
            setShowOptions(false);
         } else {
            setShowSaveValidation(false);
            setShowOptions(true);
         }
      }

      if (type === "delete") {
         if (!showDeleteValidation) {
            setShowDeleteValidation(!showDeleteValidation);
            setShowSaveValidation(false);
            setShowOptions(false);
         } else {
            setShowDeleteValidation(false);
            setShowOptions(true);
         }
      }
   };

   return (
      <section>
         <form className={styles.productInfo} encType="multipart/form-data">
            <input
               type="file"
               accept="image/*"
               onChange={(e) => {
                  setNewInfos({ ...newInfos, imageUrl: e.target.files[0].name, image: e.target.files[0] });
               }}
            />
            <input type="text" placeholder="Categorie" onChange={(e) => setNewInfos({ ...newInfos, category: e.target.value })} />
            <input type="text" placeholder="Couleur" onChange={(e) => setNewInfos({ ...newInfos, color: e.target.value })} />
            <input type="number" placeholder="Prix" onChange={(e) => setNewInfos({ ...newInfos, price: e.target.value })} />
            <input type="number" placeholder="Quantité" onChange={(e) => setNewInfos({ ...newInfos, quantity: e.target.value })} />
            <textarea placeholder="Description" style={{ height: "150px" }} onChange={(e) => setNewInfos({ ...newInfos, description: e.target.value })} />
            <div className={styles.buttonsContainer}>
               {!showSaveValidation && showOptions && <button onClick={() => validation("save")}>Sauvegarder</button>}

               {showSaveValidation && (
                  <>
                     <p>Valider les changements ?</p>
                     <button
                        onClick={(e) => {
                           handleSaveClick(e), validation("save");
                        }}
                     >
                        Oui
                     </button>
                     <button onClick={() => validation("save")}>Non</button>
                  </>
               )}

               {!showDeleteValidation && showOptions && <button onClick={() => validation("delete")}>Supprimer</button>}

               {showDeleteValidation && (
                  <>
                     <p>Voulez-vous retirer l'article ?</p>
                     <button
                        onClick={(e) => {
                           handleDeleteClick(e), validation("delete");
                        }}
                     >
                        Oui
                     </button>
                     <button onClick={() => validation("delete")}>Non</button>
                  </>
               )}
               {message && <MessageToast content={message} />}
            </div>
         </form>
      </section>
   );
}

/***********************************************/
/******************* PARENT ********************/
/***********************************************/
/************ ADD - EDIT - DELETE **************/
/***********************************************/

export default function AdminProducts() {
   const { products, loading, error, urlServer } = useProducts(); // Hook personnalisé de chargement des produits

   return (
      <div className={styles.mainAdminProductContainer}>
         <AddArticle /> {/* Composant enfant definit plus haut */}
         <section className={styles.editDeleteContainer}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading &&
               !error &&
               products.map((product) => (
                  <div key={product.id} className={styles.articlesContainer}>
                     <Article key={product.id} product={product} urlServer={urlServer} />
                     <EditOrDeleteArticle productId={product.id} /> {/* Composant enfant definit plus haut */}
                  </div>
               ))}
         </section>
      </div>
   );
}
