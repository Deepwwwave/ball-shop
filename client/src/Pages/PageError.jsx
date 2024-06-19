import React from "react";

export default function PageError() {
   const style = {
      color: "",
      textAlign: "center",
      marginTop: "150px",
      marginBottom: "150px",
      fontFamily: "Arial, sans-serif",
   };

   return (
      <section style={style}>
         <h1>Une erreur est survenue ...</h1>
         <img src="images/maintenance_en_cours.png" alt="" />
      </section>
   );
}
