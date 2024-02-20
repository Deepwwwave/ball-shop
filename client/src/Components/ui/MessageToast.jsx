import React, { useState, useEffect } from "react";

export default function MessageToast({ content }) {
   return (

         <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "#333", color: "#fff", padding: "10px", borderRadius: "5px" }}>{content}</div>
   );
}

