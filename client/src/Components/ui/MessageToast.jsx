import React, { useState, useEffect } from "react";

export default function MessageToast({ content }) {

      
   return (

      <div style={{ position: "fixed", top: "20%", left: "44%", background: "#333", color: "#fff", padding: "10px", borderRadius: "5px" }}>{content}</div>

   );
}

